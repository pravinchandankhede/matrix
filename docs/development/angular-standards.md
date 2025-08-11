## Angular 20 Components

### Component Architecture Overview

Matrix Portal follows Angular 20 best practices with a three-tier inheritance architecture that provides maximum code reuse and consistency across all components.

#### Component Hierarchy

```typescript
BaseComponent<T>           â† Core foundation with shared utilities
â”œâ”€â”€ BaseListComponent<T>   â† List-specific functionality 
â””â”€â”€ BaseDetailComponent<T> â† Detail/CRUD-specific functionality
```

### Standard Component Structure

```bash
component-name/
â”œâ”€â”€ component-name.component.html    # Template
â”œâ”€â”€ component-name.component.ts      # Component logic
â”œâ”€â”€ component-name.component.css     # Component-specific styles
â””â”€â”€ component-name.component.spec.ts # Unit tests
```

### Component Types & Patterns

#### 1. List Components

**Purpose**: Display collections of entities with search, filter, and CRUD operations.
**Base Class**: `BaseListComponent<T>`
**Key Features**: Pagination, search, filtering, batch operations

```typescript
// Example: Agent List Component
@Component({
    selector: 'app-agent-list',
    templateUrl: './agent-list.component.html',
    styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent extends BaseListComponent<Agent> {
    private agentService = inject(AgentService);

    // Required abstract method implementations
    getEntityName(): string { return 'Agent'; }
    getListContext(): string { return 'Agent List'; }
    getDetailRoute(): string { return '/agents'; }
    getItemId(item: Agent): string { return item.agentUId; }

    fetchItems(): void {
        this.agentService.getAgents()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data: Agent[]) => this.handleLoadSuccess(data),
                error: (err: any) => this.handleLoadError(err)
            });
    }

    filterPredicate(item: Agent): boolean {
        const matchesName = item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesType = item.type?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false;
        return matchesName || matchesType;
    }

    // Standard navigation methods
    onAdd(): void { this.navigateToAdd(); }
    onEdit(item: Agent): void { this.navigateToEdit(item.agentUId); }
    onView(item: Agent): void { this.navigateToDetail(item.agentUId); }
    onDelete(item: Agent): void {
        this.handleDelete(item, () => {
            this.agentService.deleteAgent(item.agentUId)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: () => this.handleDeleteSuccess(item.name),
                    error: (err: any) => this.handleDeleteError(err)
                });
        });
    }
}
```

#### 2. Detail Components

**Purpose**: Display and edit individual entities with full CRUD operations.
**Base Class**: `BaseDetailComponent<T>`
**Key Features**: View/Edit modes, form validation, section navigation

```typescript
// Example: Agent Detail Component
@Component({
    selector: 'app-agent-detail',
    templateUrl: './agent-detail.component.html',
    styleUrls: ['./agent-detail.component.css']
})
export class AgentDetailComponent extends BaseDetailComponent<Agent> implements AfterViewInit {
    agentForm: FormGroup;
    activeSection: string = 'general';

    private fb = inject(FormBuilder);
    private agentService = inject(AgentService);

    constructor() {
        super();
        this.agentForm = this.createForm();
    }

    override ngOnInit(): void {
        super.ngOnInit(); // Essential for routing and lifecycle
    }

    ngAfterViewInit(): void {
        // Initialize form for new items after view initialization
        setTimeout(() => {
            if (this.isNew && this.item) {
                this.populateForm();
            }
        });
    }

    // Required abstract method implementations
    getItemService(): AgentService { return this.agentService; }
    getItemName(item: Agent): string { return item.name || 'Unknown Agent'; }
    getItemListRoute(): string { return '/agents'; }
    getEntityName(): string { return 'Agent'; }
    getErrorContext(): string { return 'Agent Detail'; }
    getItemId(item: Agent): string { return item.agentUId; }

    createNewItem(): Agent {
        return {
            agentUId: this.generateId(),
            name: '',
            description: '',
            type: '',
            capabilities: [],
            status: 'Active',
            version: '1.0.0',
            features: [],
            tools: [],
            createdBy: 'System',
            createdDate: new Date(),
            modifiedBy: 'System',
            modifiedDate: new Date(),
            correlationUId: this.generateId(),
            rowVersion: undefined,
            metadata: []
        };
    }

    validateItem(): string[] {
        const errors: string[] = [];
        this.markFormGroupTouched(this.agentForm);

        if (!this.agentForm.valid) {
            errors.push(...this.getFormValidationErrors(this.agentForm));
        }

        // Business logic validation
        if (this.item) {
            if (this.item.capabilities.length === 0) {
                errors.push('At least one capability is required.');
            }
        }

        return errors;
    }

    updateItemFromForm(): void {
        if (!this.item) return;

        const formValue = this.agentForm.value;
        this.item.name = formValue.name?.trim() || '';
        this.item.description = formValue.description?.trim() || '';
        this.item.type = formValue.type || '';
        this.item.status = formValue.status || 'Active';
        this.item.version = formValue.version || '1.0.0';

        this.item.modifiedBy = 'System';
        this.item.modifiedDate = new Date();
    }

    // Lifecycle hooks
    protected override onItemLoaded(item: Agent): void {
        this.populateForm();
    }

    protected override onItemUpdated(): void {
        this.populateForm();
    }

    // Section navigation
    setActiveSection(section: string): void {
        this.activeSection = section;
    }

    // Form management methods...
    private createForm(): FormGroup { /* Implementation */ }
    private populateForm(): void { /* Implementation */ }
}
```

### Component Lifecycle Management

#### Angular 20 Lifecycle Hooks Usage

```typescript
export class ExampleComponent implements OnInit, AfterViewInit, OnDestroy {
    
    ngOnInit(): void {
        // Component initialization
        // Subscribe to route parameters
        // Set up initial data
    }

    ngAfterViewInit(): void {
        // DOM is ready
        // Initialize third-party libraries
        // Set up form validation
        setTimeout(() => {
            // Delayed initialization if needed
        });
    }

    ngOnDestroy(): void {
        // Cleanup subscriptions (handled by BaseComponent)
        // Release resources
        this.destroy$.next();
        this.destroy$.complete();
    }
}
```

### Modern Dependency Injection Patterns

#### Angular 20 inject() Function

```typescript
// âœ… RECOMMENDED: Modern inject() pattern
@Component({...})
export class ModernComponent {
    private service = inject(MyService);
    private router = inject(Router);
    private fb = inject(FormBuilder);
}

// âŒ LEGACY: Constructor injection (still supported but verbose)
export class LegacyComponent {
    constructor(
        private service: MyService,
        private router: Router,
        private fb: FormBuilder
    ) {}
}
```

### Component Communication Patterns

#### Parent-Child Communication

```typescript
// Parent to Child - Input Properties
@Component({
    template: `<child-component [data]="parentData" [config]="settings"></child-component>`
})
export class ParentComponent {
    parentData = { /* data */ };
    settings = { /* config */ };
}

// Child Component
export class ChildComponent {
    @Input() data: any;
    @Input() config: any;
}

// Child to Parent - Output Events
export class ChildComponent {
    @Output() dataChanged = new EventEmitter<any>();
    @Output() actionTriggered = new EventEmitter<string>();

    onDataChange(newData: any): void {
        this.dataChanged.emit(newData);
    }
}
```

#### Service-Based Communication

```typescript
// Shared service for component communication
@Injectable({ providedIn: 'root' })
export class ComponentCommunicationService {
    private dataSubject = new BehaviorSubject<any>(null);
    public data$ = this.dataSubject.asObservable();

    updateData(data: any): void {
        this.dataSubject.next(data);
    }
}

// Components subscribe to shared data
export class ComponentA {
    private commService = inject(ComponentCommunicationService);

    ngOnInit(): void {
        this.commService.data$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(data => {
            // Handle data updates
        });
    }
}
```

---


