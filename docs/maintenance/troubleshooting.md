# Troubleshooting Guide

Common issues and solutions for Matrix Portal development and deployment.

## Development Issues

### Installation Problems

#### Node.js Version Conflicts

**Problem:** Different Node.js versions causing compatibility issues.

**Solution:**
```bash
# Install Node Version Manager (nvm)
# Windows
winget install CoreyButler.NVMforWindows

# Install and use specific Node version
nvm install 18.17.0
nvm use 18.17.0

# Verify version
node --version
```

#### npm Install Failures

**Problem:** `npm install` fails with permission or dependency errors.

**Solutions:**

1. **Clear npm cache:**
```bash
npm cache clean --force
```

2. **Delete node_modules and reinstall:**
```bash
rm -rf node_modules package-lock.json
npm install
```

3. **Fix permissions (Windows):**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

4. **Use yarn as alternative:**
```bash
npm install -g yarn
yarn install
```

#### Angular CLI Issues

**Problem:** Angular CLI commands fail or not recognized.

**Solutions:**

1. **Reinstall Angular CLI:**
```bash
npm uninstall -g @angular/cli
npm cache clean --force
npm install -g @angular/cli@latest
```

2. **Version conflicts:**
```bash
# Check versions
ng version
npm list @angular/cli

# Use npx for local CLI
npx @angular/cli serve
```

### Build Issues

#### TypeScript Compilation Errors

**Problem:** TypeScript strict mode errors.

**Solutions:**

1. **Check tsconfig.json configuration:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

2. **Fix common type issues:**
```typescript
// ❌ Implicit any
function process(data) { }

// ✅ Explicit typing
function process(data: any): void { }

// ❌ Possible null
const element = document.getElementById('myId');
element.style.display = 'none';

// ✅ Null check
const element = document.getElementById('myId');
if (element) {
  element.style.display = 'none';
}
```

#### Bundle Size Issues

**Problem:** Large bundle sizes affecting performance.

**Solutions:**

1. **Analyze bundle:**
```bash
npm install -g webpack-bundle-analyzer
ng build --stats-json
npx webpack-bundle-analyzer dist/stats.json
```

2. **Enable tree shaking:**
```typescript
// ❌ Imports entire library
import * as _ from 'lodash';

// ✅ Import specific functions
import { debounce } from 'lodash';
```

3. **Lazy load modules:**
```typescript
const routes: Routes = [
  {
    path: 'agents',
    loadChildren: () => import('./agents/agents.module').then(m => m.AgentsModule)
  }
];
```

### Runtime Issues

#### Memory Leaks

**Problem:** Application consuming excessive memory.

**Solutions:**

1. **Unsubscribe from observables:**
```typescript
export class Component implements OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.service.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

2. **Remove event listeners:**
```typescript
ngOnDestroy() {
  document.removeEventListener('click', this.clickHandler);
  window.removeEventListener('resize', this.resizeHandler);
}
```

#### Change Detection Performance

**Problem:** Application feels slow, frequent change detection cycles.

**Solutions:**

1. **Use OnPush change detection:**
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedComponent { }
```

2. **Use trackBy functions:**
```typescript
trackByFn(index: number, item: any): any {
  return item.id;
}
```

```html
<div *ngFor="let item of items; trackBy: trackByFn">
  {{ item.name }}
</div>
```

## Testing Issues

### Unit Test Failures

#### TestBed Configuration

**Problem:** Component tests failing due to missing dependencies.

**Solution:**
```typescript
beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [TestComponent],
    imports: [
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      NoopAnimationsModule // Disable animations in tests
    ],
    providers: [
      { provide: MyService, useValue: mockService }
    ]
  }).compileComponents();
});
```

#### Async Testing Issues

**Problem:** Tests failing due to async operations.

**Solutions:**

1. **Use fakeAsync and tick:**
```typescript
it('should handle async operation', fakeAsync(() => {
  component.loadData();
  tick(1000); // Advance time
  expect(component.data).toBeDefined();
}));
```

2. **Use async/await:**
```typescript
it('should handle async operation', async () => {
  await component.loadData();
  expect(component.data).toBeDefined();
});
```

### E2E Test Issues

#### Selenium WebDriver Problems

**Problem:** E2E tests failing with browser issues.

**Solutions:**

1. **Update WebDriver:**
```bash
npx webdriver-manager update
```

2. **Use headless mode:**
```typescript
// protractor.conf.js
capabilities: {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--headless', '--disable-gpu']
  }
}
```

## Production Issues

### Deployment Failures

#### Build Optimization Errors

**Problem:** Production build fails with optimization errors.

**Solutions:**

1. **Disable build optimizer temporarily:**
```bash
ng build --prod --build-optimizer=false
```

2. **Check for dynamic imports:**
```typescript
// ❌ Dynamic property access
const service = injector.get('MyService');

// ✅ Proper injection
constructor(private myService: MyService) {}
```

#### Environment Configuration

**Problem:** Environment variables not loading correctly.

**Solution:**
```typescript
// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: process.env['API_URL'] || 'https://api.production.com',
  // Ensure all required variables are defined
};
```

### Performance Issues

#### Slow Initial Load

**Problem:** Application takes too long to load initially.

**Solutions:**

1. **Enable service worker:**
```bash
ng add @angular/pwa
```

2. **Preload critical routes:**
```typescript
@Injectable()
export class PreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    if (route.data && route.data['preload']) {
      return load();
    }
    return of(null);
  }
}
```

3. **Optimize images:**
```bash
# Install imagemin
npm install --save-dev imagemin imagemin-pngquant imagemin-mozjpeg

# Optimize images during build
```

#### API Performance

**Problem:** Slow API responses affecting user experience.

**Solutions:**

1. **Implement caching:**
```typescript
@Injectable()
export class CacheService {
  private cache = new Map<string, any>();

  get(key: string): any {
    return this.cache.get(key);
  }

  set(key: string, data: any, ttl: number = 300000): void {
    this.cache.set(key, data);
    setTimeout(() => this.cache.delete(key), ttl);
  }
}
```

2. **Use pagination:**
```typescript
getAgents(page: number = 1, size: number = 20): Observable<Agent[]> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());
  
  return this.http.get<Agent[]>('/api/agents', { params });
}
```

3. **Implement loading states:**
```typescript
@Component({
  template: `
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="!loading && data">{{ data | json }}</div>
  `
})
export class DataComponent {
  loading = true;
  data: any;

  ngOnInit() {
    this.service.getData().subscribe(data => {
      this.data = data;
      this.loading = false;
    });
  }
}
```

## Browser Compatibility

### Internet Explorer Issues

**Problem:** Application not working in Internet Explorer.

**Solutions:**

1. **Enable polyfills:**
```typescript
// polyfills.ts
import 'core-js/es/promise';
import 'core-js/es/array';
import 'core-js/es/map';
import 'core-js/es/set';
```

2. **Update browserslist:**
```
# .browserslistrc
> 0.5%
last 2 versions
Firefox ESR
not dead
IE 11
```

### Mobile Browser Issues

**Problem:** Touch events not working properly on mobile.

**Solutions:**

1. **Use proper touch events:**
```typescript
@HostListener('touchstart', ['$event'])
onTouchStart(event: TouchEvent) {
  // Handle touch start
}

@HostListener('touchend', ['$event'])
onTouchEnd(event: TouchEvent) {
  // Handle touch end
}
```

2. **Add viewport meta tag:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## Common Error Messages

### "Cannot read property of undefined"

**Cause:** Accessing properties on null/undefined objects.

**Solution:**
```typescript
// ❌ Unsafe property access
const name = user.profile.name;

// ✅ Safe property access
const name = user?.profile?.name;

// ✅ With default value
const name = user?.profile?.name || 'Unknown';
```

### "Expression changed after it was checked"

**Cause:** Data changing during change detection cycle.

**Solutions:**

1. **Use setTimeout:**
```typescript
ngAfterViewInit() {
  setTimeout(() => {
    this.data = newValue;
  });
}
```

2. **Use ChangeDetectorRef:**
```typescript
constructor(private cdr: ChangeDetectorRef) {}

updateData() {
  this.data = newValue;
  this.cdr.detectChanges();
}
```

### "Can't resolve all parameters"

**Cause:** Dependency injection issues.

**Solution:**
```typescript
// ❌ Missing @Injectable
class MyService {
  constructor(private http: HttpClient) {}
}

// ✅ Proper service decoration
@Injectable({
  providedIn: 'root'
})
class MyService {
  constructor(private http: HttpClient) {}
}
```

## Getting Help

### Documentation Resources

- [Angular Official Documentation](https://angular.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Angular Material Guide](https://material.angular.io/)
- [RxJS Documentation](https://rxjs.dev/)

### Community Support

- [Stack Overflow](https://stackoverflow.com/questions/tagged/angular)
- [Angular Discord](https://discord.gg/angular)
- [Reddit r/Angular2](https://www.reddit.com/r/Angular2/)

### Internal Support

- Create an issue in the GitHub repository
- Contact the development team
- Review the [Development Standards](../development/standards.md)
- Check the [Architecture Documentation](../architecture/overview.md)

---

*If you encounter an issue not covered in this guide, please [create an issue](https://github.com/your-org/matrix-portal/issues) or contact the development team.*
