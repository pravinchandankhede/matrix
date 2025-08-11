## Security Standards

### Authentication & Authorization

```typescript
// JWT token management service
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly TOKEN_KEY = 'matrix_auth_token';
    private readonly REFRESH_TOKEN_KEY = 'matrix_refresh_token';
    
    private currentUser$ = new BehaviorSubject<User | null>(null);
    private tokenRefreshSubscription?: Subscription;
    
    constructor(
        private http: HttpClient,
        private router: Router,
        private notificationService: NotificationService
    ) {
        this.initializeAuth();
    }
    
    private initializeAuth(): void {
        const token = this.getStoredToken();
        if (token && !this.isTokenExpired(token)) {
            this.setAuthToken(token);
            this.loadCurrentUser();
            this.scheduleTokenRefresh();
        }
    }
    
    login(credentials: LoginCredentials): Observable<AuthResponse> {
        return this.http.post<AuthResponse>('/api/auth/login', credentials)
            .pipe(
                tap(response => {
                    this.handleAuthSuccess(response);
                }),
                catchError(error => {
                    this.handleAuthError(error);
                    return throwError(() => error);
                })
            );
    }
    
    private handleAuthSuccess(response: AuthResponse): void {
        // Store tokens securely
        localStorage.setItem(this.TOKEN_KEY, response.accessToken);
        localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
        
        // Set authentication header
        this.setAuthToken(response.accessToken);
        
        // Load user profile
        this.currentUser$.next(response.user);
        
        // Schedule token refresh
        this.scheduleTokenRefresh();
    }
    
    private scheduleTokenRefresh(): void {
        const token = this.getStoredToken();
        if (!token) return;
        
        const expirationTime = this.getTokenExpirationTime(token);
        const refreshTime = expirationTime - (5 * 60 * 1000); // 5 minutes before expiry
        const delay = refreshTime - Date.now();
        
        if (delay > 0) {
            this.tokenRefreshSubscription = timer(delay).subscribe(() => {
                this.refreshToken();
            });
        }
    }
    
    private refreshToken(): Observable<AuthResponse> {
        const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
        if (!refreshToken) {
            this.logout();
            return throwError(() => new Error('No refresh token available'));
        }
        
        return this.http.post<AuthResponse>('/api/auth/refresh', { refreshToken })
            .pipe(
                tap(response => this.handleAuthSuccess(response)),
                catchError(error => {
                    this.logout();
                    return throwError(() => error);
                })
            );
    }
    
    logout(): void {
        // Clear stored tokens
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
        
        // Clear current user
        this.currentUser$.next(null);
        
        // Cancel token refresh
        this.tokenRefreshSubscription?.unsubscribe();
        
        // Redirect to login
        this.router.navigate(['/login']);
    }
    
    hasRole(role: string): boolean {
        const user = this.currentUser$.value;
        return user?.roles?.includes(role) ?? false;
    }
    
    hasPermission(permission: string): boolean {
        const user = this.currentUser$.value;
        return user?.permissions?.includes(permission) ?? false;
    }
}

// Route guards with role-based access
@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
    
    canActivate(route: ActivatedRouteSnapshot): boolean {
        const requiredRoles = route.data['roles'] as string[];
        
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }
        
        const hasRequiredRole = requiredRoles.some(role => 
            this.authService.hasRole(role)
        );
        
        if (!hasRequiredRole) {
            this.router.navigate(['/unauthorized']);
            return false;
        }
        
        return true;
    }
}
```

### Input Sanitization & XSS Prevention

```typescript
// Sanitization service
@Injectable({
    providedIn: 'root'
})
export class SanitizationService {
    constructor(private sanitizer: DomSanitizer) {}
    
    sanitizeHtml(html: string): SafeHtml {
        return this.sanitizer.sanitize(SecurityContext.HTML, html) || '';
    }
    
    sanitizeInput(input: string): string {
        // Remove potentially dangerous characters
        return input
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+\s*=/gi, '');
    }
    
    validateInput(input: string, maxLength: number = 1000): boolean {
        if (!input || input.length > maxLength) {
            return false;
        }
        
        // Check for SQL injection patterns
        const sqlPatterns = [
            /(\bUNION\b|\bSELECT\b|\bINSERT\b|\bDELETE\b|\bUPDATE\b|\bDROP\b)/i,
            /(\bOR\b|\bAND\b)\s+\d+\s*=\s*\d+/i,
            /[\'"]\s*;\s*[\'"]|\bEXEC\b|\bEXECUTE\b/i
        ];
        
        return !sqlPatterns.some(pattern => pattern.test(input));
    }
}

// Form validation with security
@Component({})
export class SecureFormComponent {
    private sanitizationService = inject(SanitizationService);
    
    createSecureForm(): FormGroup {
        return this.fb.group({
            name: ['', [
                Validators.required,
                this.createSecurityValidator()
            ]],
            description: ['', [
                Validators.maxLength(1000),
                this.createSecurityValidator()
            ]]
        });
    }
    
    private createSecurityValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) return null;
            
            if (!this.sanitizationService.validateInput(value)) {
                return { 
                    securityViolation: { 
                        message: 'Input contains potentially unsafe content' 
                    } 
                };
            }
            
            return null;
        };
    }
    
    onSubmit(): void {
        if (this.form.valid) {
            // Sanitize all inputs before submission
            const sanitizedData = Object.keys(this.form.value).reduce((acc, key) => {
                const value = this.form.value[key];
                acc[key] = typeof value === 'string' 
                    ? this.sanitizationService.sanitizeInput(value)
                    : value;
                return acc;
            }, {} as any);
            
            this.submitData(sanitizedData);
        }
    }
}
```

---


