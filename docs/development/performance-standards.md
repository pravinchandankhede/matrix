## Performance Optimization Standards

### Lazy Loading & Code Splitting

```typescript
// Route-based code splitting
const routes: Routes = [
    {
        path: 'agents',
        loadChildren: () => import('./modules/agents/agents.module').then(m => m.AgentsModule),
        canActivate: [AuthGuard],
        data: { preload: true }
    },
    {
        path: 'models',
        loadChildren: () => import('./modules/models/models.module').then(m => m.ModelsModule),
        canActivate: [AuthGuard]
    }
];

// Preloading strategy
@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        // Preload routes marked with preload: true
        if (route.data && route.data['preload']) {
            console.log('Preloading: ' + route.path);
            return load();
        }
        return of(null);
    }
}

// Component-level lazy loading
@Component({
    template: `
        <ng-container *ngIf="shouldLoadHeavyComponent">
            <app-heavy-component></app-heavy-component>
        </ng-container>
    `
})
export class OptimizedComponent {
    shouldLoadHeavyComponent = signal<boolean>(false);
    
    loadHeavyComponent(): void {
        // Load heavy component only when needed
        this.shouldLoadHeavyComponent.set(true);
    }
}
```

### Memory Management & OnDestroy

```typescript
// Comprehensive cleanup pattern
@Component({})
export class OptimizedComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();
    private subscriptions = new Subscription();
    
    ngOnInit(): void {
        // RxJS subscription management
        this.dataService.getData()
            .pipe(takeUntil(this.destroy$))
            .subscribe(data => this.handleData(data));
        
        // Manual subscription tracking
        const intervalSub = interval(1000)
            .subscribe(tick => this.updateTimer(tick));
        this.subscriptions.add(intervalSub);
        
        // DOM event listeners
        this.setupEventListeners();
    }
    
    ngOnDestroy(): void {
        // Signal-based cleanup
        this.destroy$.next();
        this.destroy$.complete();
        
        // Manual subscription cleanup
        this.subscriptions.unsubscribe();
        
        // DOM cleanup
        this.cleanupEventListeners();
        
        // Clear timers
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }
    
    private setupEventListeners(): void {
        document.addEventListener('click', this.handleDocumentClick);
        window.addEventListener('resize', this.handleResize);
    }
    
    private cleanupEventListeners(): void {
        document.removeEventListener('click', this.handleDocumentClick);
        window.removeEventListener('resize', this.handleResize);
    }
}
```

### Virtual Scrolling & Large Lists

```typescript
// Virtual scrolling implementation
@Component({
    template: `
        <cdk-virtual-scroll-viewport itemSize="80" class="viewport">
            <div *cdkVirtualFor="let agent of agents; trackBy: trackByUid" 
                 class="agent-item">
                <mat-card>
                    <mat-card-content>
                        <h3>{{ agent.name }}</h3>
                        <p>{{ agent.description }}</p>
                    </mat-card-content>
                </mat-card>
            </div>
        </cdk-virtual-scroll-viewport>
    `,
    styles: [`
        .viewport {
            height: 500px;
        }
        .agent-item {
            height: 80px;
            padding: 8px;
        }
    `]
})
export class VirtualScrollListComponent {
    agents = signal<Agent[]>([]);
    
    trackByUid(index: number, item: Agent): string {
        return item.uid;
    }
}
```

### Change Detection Optimization

```typescript
// OnPush change detection strategy
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="agent-card" [class.selected]="isSelected()">
            <h3>{{ agent().name }}</h3>
            <p>{{ agent().description }}</p>
            <button (click)="toggle()">Toggle</button>
        </div>
    `
})
export class OptimizedAgentCardComponent {
    agent = input.required<Agent>();
    selected = input<boolean>(false);
    
    // Computed signals for derived state
    isSelected = computed(() => this.selected());
    displayName = computed(() => `${this.agent().name} (v${this.agent().version})`);
    
    // Event emitters for parent communication
    toggleEvent = output<boolean>();
    
    toggle(): void {
        this.toggleEvent.emit(!this.selected());
    }
}
```

---


