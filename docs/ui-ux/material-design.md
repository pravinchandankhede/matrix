## Angular Material Best Practices

### Material Design System Integration

Matrix Portal leverages Angular Material components with a consistent design system, custom theming, and accessibility-first approaches.

```typescript
// Custom Material theme configuration
// Located in: src/styles/theme.scss

// Import Angular Material theming functions
@use '@angular/material' as mat;

// Define custom color palettes
$matrix-primary: mat.define-palette((
    50: #e3f2fd,
    100: #bbdefb,
    200: #90caf9,
    300: #64b5f6,
    400: #42a5f5,
    500: #2196f3,  // Primary color
    600: #1e88e5,
    700: #1976d2,
    800: #1565c0,
    900: #0d47a1,
    contrast: (
        50: rgba(black, 0.87),
        100: rgba(black, 0.87),
        200: rgba(black, 0.87),
        300: rgba(black, 0.87),
        400: rgba(black, 0.87),
        500: white,
        600: white,
        700: white,
        800: white,
        900: white,
    )
));

$matrix-accent: mat.define-palette((
    50: #f3e5f5,
    100: #e1bee7,
    200: #ce93d8,
    300: #ba68c8,
    400: #ab47bc,
    500: #9c27b0,  // Accent color
    600: #8e24aa,
    700: #7b1fa2,
    800: #6a1b9a,
    900: #4a148c,
    contrast: (
        50: rgba(black, 0.87),
        100: rgba(black, 0.87),
        200: rgba(black, 0.87),
        300: white,
        400: white,
        500: white,
        600: white,
        700: white,
        800: white,
        900: white,
    )
));

$matrix-warn: mat.define-palette(mat.$red-palette);

// Create theme
$matrix-theme: mat.define-light-theme((
    color: (
        primary: $matrix-primary,
        accent: $matrix-accent,
        warn: $matrix-warn,
    ),
    typography: mat.define-typography-config(
        $font-family: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        $headline-1: mat.define-typography-level(32px, 48px, 700),
        $headline-2: mat.define-typography-level(28px, 40px, 600),
        $headline-3: mat.define-typography-level(24px, 32px, 600),
        $headline-4: mat.define-typography-level(20px, 28px, 500),
        $headline-5: mat.define-typography-level(18px, 24px, 500),
        $headline-6: mat.define-typography-level(16px, 20px, 500),
        $body-1: mat.define-typography-level(14px, 20px, 400),
        $body-2: mat.define-typography-level(12px, 16px, 400),
        $caption: mat.define-typography-level(12px, 16px, 400),
        $button: mat.define-typography-level(14px, 20px, 500),
    ),
    density: 0
));

// Dark theme variant
$matrix-dark-theme: mat.define-dark-theme((
    color: (
        primary: $matrix-primary,
        accent: $matrix-accent,
        warn: $matrix-warn,
    ),
    typography: mat.define-typography-config(
        $font-family: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    ),
    density: 0
));

// Apply themes
@include mat.core();
@include mat.all-component-themes($matrix-theme);

// Dark theme class
.dark-theme {
    @include mat.all-component-colors($matrix-dark-theme);
}

// Custom component styles that respect Material Design
.matrix-card {
    @include mat.elevation(2);
    border-radius: 8px;
    overflow: hidden;
    
    &:hover {
        @include mat.elevation(4);
    }
}

.matrix-button-group {
    .mat-button,
    .mat-raised-button {
        margin-right: 8px;
        
        &:last-child {
            margin-right: 0;
        }
    }
}
```

### Material Component Best Practices

```typescript
// Standard Material component usage patterns
@Component({
    selector: 'app-material-showcase',
    template: `
        <!-- Cards with consistent styling -->
        <mat-card class="content-card">
            <mat-card-header>
                <div mat-card-avatar class="entity-avatar">
                    <mat-icon>smart_toy</mat-icon>
                </div>
                <mat-card-title>{{ title }}</mat-card-title>
                <mat-card-subtitle>{{ subtitle }}</mat-card-subtitle>
                <div class="card-header-actions">
                    <button mat-icon-button [matMenuTriggerFor]="cardMenu">
                        <mat-icon>more_vert</mat-icon>
                    </button>
                </div>
            </mat-card-header>
            
            <mat-card-content>
                <!-- Form fields with consistent appearance -->
                <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Agent Name</mat-label>
                    <input matInput [formControl]="nameControl">
                    <mat-icon matSuffix>smart_toy</mat-icon>
                    <mat-hint>Enter a unique name for your agent</mat-hint>
                    <mat-error *ngIf="nameControl.hasError('required')">
                        Agent name is required
                    </mat-error>
                </mat-form-field>
                
                <!-- Select with proper options -->
                <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Agent Type</mat-label>
                    <mat-select [formControl]="typeControl">
                        <mat-option *ngFor="let type of agentTypes" [value]="type.value">
                            <div class="option-content">
                                <mat-icon>{{ type.icon }}</mat-icon>
                                <div class="option-text">
                                    <span class="option-title">{{ type.label }}</span>
                                    <span class="option-description">{{ type.description }}</span>
                                </div>
                            </div>
                        </mat-option>
                    </mat-select>
                </mat-form-field>
                
                <!-- Chips for tags/categories -->
                <div class="chips-section">
                    <h4>Capabilities</h4>
                    <mat-chip-set>
                        <mat-chip *ngFor="let capability of selectedCapabilities" 
                                  [removable]="editMode"
                                  (removed)="removeCapability(capability)">
                            {{ capability.name }}
                            <mat-icon matChipRemove *ngIf="editMode">cancel</mat-icon>
                        </mat-chip>
                        <mat-chip *ngIf="editMode" 
                                  (click)="addCapability()"
                                  class="add-chip">
                            <mat-icon>add</mat-icon>
                            Add Capability
                        </mat-chip>
                    </mat-chip-set>
                </div>
                
                <!-- Data table with sorting and pagination -->
                <mat-table [dataSource]="dataSource" 
                           matSort
                           class="entity-table">
                    
                    <!-- Selection column -->
                    <ng-container matColumnDef="select">
                        <mat-header-cell *matHeaderCellDef>
                            <mat-checkbox [checked]="isAllSelected()"
                                          [indeterminate]="isSomeSelected()"
                                          (change)="masterToggle()">
                            </mat-checkbox>
                        </mat-header-cell>
                        <mat-cell *matCellDef="let row">
                            <mat-checkbox [checked]="isSelected(row)"
                                          (change)="toggleSelection(row)">
                            </mat-checkbox>
                        </mat-cell>
                    </ng-container>
                    
                    <!-- Name column with avatar -->
                    <ng-container matColumnDef="name">
                        <mat-header-cell *matHeaderCellDef mat-sort-header>Name</mat-header-cell>
                        <mat-cell *matCellDef="let element">
                            <div class="name-cell">
                                <div class="entity-avatar">
                                    <mat-icon>{{ getEntityIcon(element) }}</mat-icon>
                                </div>
                                <div class="name-content">
                                    <span class="primary-text">{{ element.name }}</span>
                                    <span class="secondary-text">{{ element.description }}</span>
                                </div>
                            </div>
                        </mat-cell>
                    </ng-container>
                    
                    <!-- Status column with indicators -->
                    <ng-container matColumnDef="status">
                        <mat-header-cell *matHeaderCellDef mat-sort-header>Status</mat-header-cell>
                        <mat-cell *matCellDef="let element">
                            <mat-chip [class]="'status-' + element.status.toLowerCase()">
                                <mat-icon>{{ getStatusIcon(element.status) }}</mat-icon>
                                {{ element.status }}
                            </mat-chip>
                        </mat-cell>
                    </ng-container>
                    
                    <!-- Actions column -->
                    <ng-container matColumnDef="actions">
                        <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
                        <mat-cell *matCellDef="let element">
                            <div class="actions-cell">
                                <button mat-icon-button 
                                        [matTooltip]="'View ' + element.name"
                                        (click)="viewItem(element)">
                                    <mat-icon>visibility</mat-icon>
                                </button>
                                <button mat-icon-button 
                                        [matTooltip]="'Edit ' + element.name"
                                        [disabled]="!canEdit(element)"
                                        (click)="editItem(element)">
                                    <mat-icon>edit</mat-icon>
                                </button>
                                <button mat-icon-button 
                                        [matTooltip]="'Delete ' + element.name"
                                        [disabled]="!canDelete(element)"
                                        (click)="deleteItem(element)">
                                    <mat-icon color="warn">delete</mat-icon>
                                </button>
                            </div>
                        </mat-cell>
                    </ng-container>
                    
                    <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
                    <mat-row *matRowDef="let row; columns: displayedColumns;"
                             [class.selected-row]="isSelected(row)"
                             (click)="selectRow(row)">
                    </mat-row>
                </mat-table>
                
                <!-- Paginator -->
                <mat-paginator [length]="totalItems"
                               [pageSize]="pageSize"
                               [pageSizeOptions]="[10, 25, 50, 100]"
                               [showFirstLastButtons]="true">
                </mat-paginator>
            </mat-card-content>
            
            <mat-card-actions align="end">
                <button mat-button (click)="cancel()">CANCEL</button>
                <button mat-raised-button 
                        color="primary" 
                        [disabled]="!isFormValid()"
                        (click)="save()">
                    SAVE
                </button>
            </mat-card-actions>
        </mat-card>
        
        <!-- Dialog example -->
        <ng-template #dialogTemplate>
            <h2 mat-dialog-title>Confirm Action</h2>
            <mat-dialog-content>
                <p>Are you sure you want to delete this agent?</p>
                <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Type "DELETE" to confirm</mat-label>
                    <input matInput [formControl]="confirmationControl">
                </mat-form-field>
            </mat-dialog-content>
            <mat-dialog-actions align="end">
                <button mat-button mat-dialog-close>Cancel</button>
                <button mat-raised-button 
                        color="warn"
                        [disabled]="confirmationControl.value !== 'DELETE'"
                        (click)="confirmDelete()">
                    Delete
                </button>
            </mat-dialog-actions>
        </ng-template>
        
        <!-- Snackbar for notifications -->
        <!-- Handled by notification service -->
        
        <!-- Menu example -->
        <mat-menu #cardMenu="matMenu">
            <button mat-menu-item (click)="duplicateItem()">
                <mat-icon>content_copy</mat-icon>
                <span>Duplicate</span>
            </button>
            <button mat-menu-item (click)="exportItem()">
                <mat-icon>download</mat-icon>
                <span>Export</span>
            </button>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="deleteItem()" [disabled]="!canDelete()">
                <mat-icon color="warn">delete</mat-icon>
                <span>Delete</span>
            </button>
        </mat-menu>
        
        <!-- Expansion panels for grouped content -->
        <mat-accordion>
            <mat-expansion-panel [expanded]="basicInfoExpanded">
                <mat-expansion-panel-header>
                    <mat-panel-title>Basic Information</mat-panel-title>
                    <mat-panel-description>
                        Core agent settings
                    </mat-panel-description>
                </mat-expansion-panel-header>
                
                <!-- Basic info form fields -->
                <div class="panel-content">
                    <!-- Form fields here -->
                </div>
            </mat-expansion-panel>
            
            <mat-expansion-panel>
                <mat-expansion-panel-header>
                    <mat-panel-title>Advanced Settings</mat-panel-title>
                    <mat-panel-description>
                        Optional configuration
                    </mat-panel-description>
                </mat-expansion-panel-header>
                
                <!-- Advanced settings form fields -->
                <div class="panel-content">
                    <!-- Form fields here -->
                </div>
            </mat-expansion-panel>
        </mat-accordion>
        
        <!-- Stepper for multi-step processes -->
        <mat-stepper [linear]="true" #stepper>
            <mat-step [stepControl]="basicInfoForm" label="Basic Information">
                <form [formGroup]="basicInfoForm">
                    <!-- Step 1 content -->
                </form>
                <div class="stepper-actions">
                    <button mat-button matStepperNext [disabled]="!basicInfoForm.valid">
                        Next
                    </button>
                </div>
            </mat-step>
            
            <mat-step [stepControl]="capabilitiesForm" label="Capabilities">
                <form [formGroup]="capabilitiesForm">
                    <!-- Step 2 content -->
                </form>
                <div class="stepper-actions">
                    <button mat-button matStepperPrevious>Back</button>
                    <button mat-button matStepperNext [disabled]="!capabilitiesForm.valid">
                        Next
                    </button>
                </div>
            </mat-step>
            
            <mat-step label="Review">
                <!-- Review step content -->
                <div class="stepper-actions">
                    <button mat-button matStepperPrevious>Back</button>
                    <button mat-raised-button color="primary" (click)="createAgent()">
                        Create Agent
                    </button>
                </div>
            </mat-step>
        </mat-stepper>
        
        <!-- Progress indicators -->
        <div class="progress-section" *ngIf="isLoading">
            <mat-progress-bar mode="indeterminate"></mat-progress-bar>
            <p>Loading agents...</p>
        </div>
        
        <!-- Tabs for organized content -->
        <mat-tab-group>
            <mat-tab label="Overview">
                <div class="tab-content">
                    <!-- Overview content -->
                </div>
            </mat-tab>
            <mat-tab label="Configuration">
                <div class="tab-content">
                    <!-- Configuration content -->
                </div>
            </mat-tab>
            <mat-tab label="History">
                <div class="tab-content">
                    <!-- History content -->
                </div>
            </mat-tab>
        </mat-tab-group>
    `,
    styleUrls: ['./material-showcase.component.scss']
})
export class MaterialShowcaseComponent {
    // Component implementation with Material best practices
    
    nameControl = new FormControl('', [Validators.required]);
    typeControl = new FormControl('', [Validators.required]);
    confirmationControl = new FormControl('');
    
    agentTypes = [
        {
            value: 'STANDARD',
            label: 'Standard Agent',
            description: 'General purpose AI agent',
            icon: 'smart_toy'
        },
        {
            value: 'ENTERPRISE',
            label: 'Enterprise Agent',
            description: 'Advanced agent with enterprise features',
            icon: 'business'
        }
    ];
    
    selectedCapabilities = [
        { name: 'Natural Language Processing', id: 'nlp' },
        { name: 'Data Analysis', id: 'data-analysis' }
    ];
    
    displayedColumns = ['select', 'name', 'status', 'actions'];
    dataSource = new MatTableDataSource([]);
    
    // Material Design component interaction patterns
    openDialog(): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '400px',
            data: {
                title: 'Confirm Deletion',
                message: 'Are you sure you want to delete this agent?',
                confirmText: 'Delete',
                cancelText: 'Cancel'
            }
        });
        
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.performDelete();
            }
        });
    }
    
    showSnackbar(message: string, action: string = 'OK'): void {
        this.snackBar.open(message, action, {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        });
    }
    
    // Accessibility support
    announceSelection(item: any): void {
        this.liveAnnouncer.announce(`${item.name} selected`);
    }
    
    // Material table utilities
    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }
    
    masterToggle(): void {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }
}
```

### Material Theming and Customization

```scss
// Custom Material component styling
// Located in: src/styles/material-overrides.scss

// Custom card styling
.mat-card {
    &.content-card {
        margin-bottom: 16px;
        transition: box-shadow 200ms ease-in-out;
        
        &:hover {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
        }
    }
    
    &.summary-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        
        .mat-card-title,
        .mat-card-subtitle {
            color: white;
        }
    }
}

// Enhanced form field styling
.mat-form-field {
    &.full-width {
        width: 100%;
    }
    
    &.compact {
        .mat-form-field-wrapper {
            padding-bottom: 0.75em;
        }
    }
    
    // Custom appearance for different field types
    &.search-field {
        .mat-form-field-outline {
            border-radius: 20px;
        }
    }
    
    &.error-field {
        .mat-form-field-outline-thick {
            color: #f44336;
        }
    }
}

// Table styling enhancements
.mat-table {
    &.entity-table {
        .mat-header-cell {
            background-color: #f5f5f5;
            font-weight: 600;
            font-size: 14px;
        }
        
        .mat-row {
            &:hover {
                background-color: #f9f9f9;
            }
            
            &.selected-row {
                background-color: #e3f2fd;
            }
        }
        
        .mat-cell {
            &.name-cell {
                display: flex;
                align-items: center;
                
                .entity-avatar {
                    margin-right: 12px;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #e3f2fd;
                    border-radius: 50%;
                    
                    .mat-icon {
                        font-size: 18px;
                        color: #1976d2;
                    }
                }
                
                .name-content {
                    display: flex;
                    flex-direction: column;
                    
                    .primary-text {
                        font-weight: 500;
                        font-size: 14px;
                    }
                    
                    .secondary-text {
                        font-size: 12px;
                        color: rgba(0, 0, 0, 0.6);
                    }
                }
            }
            
            &.actions-cell {
                .mat-icon-button {
                    margin-right: 4px;
                    
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
    }
}

// Chip styling
.mat-chip {
    &.status-active {
        background-color: #4caf50;
        color: white;
    }
    
    &.status-inactive {
        background-color: #9e9e9e;
        color: white;
    }
    
    &.status-error {
        background-color: #f44336;
        color: white;
    }
    
    &.add-chip {
        background-color: transparent;
        border: 2px dashed #ccc;
        cursor: pointer;
        
        &:hover {
            border-color: #1976d2;
            color: #1976d2;
        }
    }
}

// Button enhancements
.mat-button,
.mat-raised-button,
.mat-flat-button {
    &.success-button {
        background-color: #4caf50;
        color: white;
    }
    
    &.warning-button {
        background-color: #ff9800;
        color: white;
    }
}

// Dialog customization
.mat-dialog-container {
    &.confirmation-dialog {
        .mat-dialog-title {
            color: #f44336;
            
            .mat-icon {
                vertical-align: middle;
                margin-right: 8px;
            }
        }
    }
}

// Stepper customization
.mat-stepper-horizontal {
    .mat-step-header {
        &.cdk-keyboard-focused,
        &.cdk-program-focused {
            background-color: rgba(33, 150, 243, 0.1);
        }
    }
    
    .mat-step-icon-selected {
        background-color: #1976d2;
    }
}

// Responsive design for Material components
@media (max-width: 768px) {
    .mat-table {
        font-size: 12px;
        
        .mat-header-cell,
        .mat-cell {
            padding: 8px;
        }
    }
    
    .mat-card {
        margin: 8px;
    }
    
    .mat-form-field {
        margin-bottom: 16px;
    }
}

// Dark theme overrides
.dark-theme {
    .mat-card {
        &.content-card {
            background-color: #424242;
            color: white;
        }
    }
    
    .mat-table {
        &.entity-table {
            .mat-header-cell {
                background-color: #303030;
                color: white;
            }
            
            .mat-row {
                &:hover {
                    background-color: #484848;
                }
                
                &.selected-row {
                    background-color: #1565c0;
                }
            }
        }
    }
}
```

---

## Testing Standards & Best Practices

### Unit Testing Framework

Matrix Portal uses Jasmine and Karma for unit testing with comprehensive coverage requirements.

```typescript
// Standard test setup for components
describe('AgentDetailComponent', () => {
    let component: AgentDetailComponent;
    let fixture: ComponentFixture<AgentDetailComponent>;
    let mockAgentService: jasmine.SpyObj<AgentService>;
    let mockNotificationService: jasmine.SpyObj<NotificationService>;
    
    beforeEach(async () => {
        const agentServiceSpy = jasmine.createSpyObj('AgentService', [
            'getById', 'update', 'delete'
        ]);
        const notificationServiceSpy = jasmine.createSpyObj('NotificationService', [
            'showSuccess', 'showError'
        ]);
        
        await TestBed.configureTestingModule({
            declarations: [AgentDetailComponent],
            imports: [
                ReactiveFormsModule,
                MatCardModule,
                MatFormFieldModule,
                MatInputModule,
                MatButtonModule,
                NoopAnimationsModule
            ],
            providers: [
                { provide: AgentService, useValue: agentServiceSpy },
                { provide: NotificationService, useValue: notificationServiceSpy },
                { provide: ActivatedRoute, useValue: {
                    params: of({ id: 'test-agent-id' }),
                    snapshot: { params: { id: 'test-agent-id' } }
                }}
            ]
        }).compileComponents();
        
        fixture = TestBed.createComponent(AgentDetailComponent);
        component = fixture.componentInstance;
        mockAgentService = TestBed.inject(AgentService) as jasmine.SpyObj<AgentService>;
        mockNotificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    });
    
    describe('Component Initialization', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });
        
        it('should load agent data on init', async () => {
            // Arrange
            const mockAgent: Agent = {
                uid: 'test-agent-id',
                name: 'Test Agent',
                description: 'Test Description',
                type: 'STANDARD',
                status: 'Active',
                version: '1.0.0',
                capabilities: ['NLP'],
                createdAt: new Date(),
                updatedAt: new Date()
            };
            mockAgentService.getById.and.returnValue(of(mockAgent));
            
            // Act
            component.ngOnInit();
            await fixture.whenStable();
            
            // Assert
            expect(mockAgentService.getById).toHaveBeenCalledWith('test-agent-id');
            expect(component.agent()).toEqual(mockAgent);
            expect(component.isLoading()).toBeFalse();
        });
        
        it('should handle agent loading error', async () => {
            // Arrange
            const error = new Error('Agent not found');
            mockAgentService.getById.and.returnValue(throwError(() => error));
            
            // Act
            component.ngOnInit();
            await fixture.whenStable();
            
            // Assert
            expect(component.isLoading()).toBeFalse();
            expect(mockNotificationService.showError).toHaveBeenCalledWith(
                'Failed to load agent details. Please try again.'
            );
        });
    });
    
    describe('Form Operations', () => {
        beforeEach(() => {
            const mockAgent: Agent = {
                uid: 'test-agent-id',
                name: 'Test Agent',
                description: 'Test Description',
                type: 'STANDARD',
                status: 'Active',
                version: '1.0.0',
                capabilities: [],
                createdAt: new Date(),
                updatedAt: new Date()
            };
            component.agent.set(mockAgent);
            component.initializeForm();
        });
        
        it('should validate required fields', () => {
            // Arrange
            const nameControl = component.agentForm.get('name');
            
            // Act
            nameControl?.setValue('');
            nameControl?.markAsTouched();
            
            // Assert
            expect(nameControl?.invalid).toBeTrue();
            expect(nameControl?.errors?.['required']).toBeTruthy();
        });
        
        it('should save agent with valid data', async () => {
            // Arrange
            const updatedAgent: Agent = {
                ...component.agent(),
                name: 'Updated Agent Name'
            };
            mockAgentService.update.and.returnValue(of(updatedAgent));
            
            component.agentForm.patchValue({ name: 'Updated Agent Name' });
            
            // Act
            component.save();
            await fixture.whenStable();
            
            // Assert
            expect(mockAgentService.update).toHaveBeenCalled();
            expect(mockNotificationService.showSuccess).toHaveBeenCalledWith(
                'Agent updated successfully'
            );
        });
    });
    
    describe('User Interactions', () => {
        it('should delete agent with confirmation', async () => {
            // Arrange
            spyOn(window, 'confirm').and.returnValue(true);
            mockAgentService.delete.and.returnValue(of(void 0));
            
            // Act
            component.delete();
            await fixture.whenStable();
            
            // Assert
            expect(window.confirm).toHaveBeenCalled();
            expect(mockAgentService.delete).toHaveBeenCalledWith('test-agent-id');
            expect(mockNotificationService.showSuccess).toHaveBeenCalledWith(
                'Agent deleted successfully'
            );
        });
        
        it('should not delete agent without confirmation', () => {
            // Arrange
            spyOn(window, 'confirm').and.returnValue(false);
            
            // Act
            component.delete();
            
            // Assert
            expect(mockAgentService.delete).not.toHaveBeenCalled();
        });
    });
    
    describe('Template Integration', () => {
        it('should display agent name in title', () => {
            // Arrange
            const mockAgent: Agent = {
                uid: 'test-agent-id',
                name: 'Test Agent',
                description: 'Test Description',
                type: 'STANDARD',
                status: 'Active',
                version: '1.0.0',
                capabilities: [],
                createdAt: new Date(),
                updatedAt: new Date()
            };
            component.agent.set(mockAgent);
            
            // Act
            fixture.detectChanges();
            
            // Assert
            const titleElement = fixture.debugElement.query(By.css('mat-card-title'));
            expect(titleElement.nativeElement.textContent).toContain('Test Agent');
        });
        
        it('should show loading state', () => {
            // Arrange
            component.isLoading.set(true);
            
            // Act
            fixture.detectChanges();
            
            // Assert
            const loadingElement = fixture.debugElement.query(By.css('mat-progress-bar'));
            expect(loadingElement).toBeTruthy();
        });
    });
});

// Service testing patterns
describe('AgentService', () => {
    let service: AgentService;
    let httpMock: HttpTestingController;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AgentService]
        });
        
        service = TestBed.inject(AgentService);
        httpMock = TestBed.inject(HttpTestingController);
    });
    
    afterEach(() => {
        httpMock.verify();
    });
    
    describe('CRUD Operations', () => {
        it('should retrieve agents', () => {
            // Arrange
            const mockAgents: Agent[] = [
                { uid: '1', name: 'Agent 1', type: 'STANDARD' } as Agent,
                { uid: '2', name: 'Agent 2', type: 'ENTERPRISE' } as Agent
            ];
            
            // Act
            service.getAll().subscribe(agents => {
                expect(agents).toEqual(mockAgents);
            });
            
            // Assert
            const req = httpMock.expectOne('/api/agents');
            expect(req.request.method).toBe('GET');
            req.flush(mockAgents);
        });
        
        it('should handle HTTP errors', () => {
            // Act
            service.getAll().subscribe({
                next: () => fail('Should have failed'),
                error: (error) => {
                    expect(error.status).toBe(500);
                }
            });
            
            // Assert
            const req = httpMock.expectOne('/api/agents');
            req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
        });
    });
    
    describe('Resource API Integration', () => {
        it('should use resource API for reactive data', () => {
            // Test resource API patterns
            const agentResource = service.getAgentResource('test-id');
            
            expect(agentResource.status()).toBe('loading');
            
            // Simulate successful load
            agentResource.reload();
            
            // Assert resource state changes
            expect(agentResource.status()).toBe('success');
        });
    });
});

// Integration testing patterns
describe('Agent Management Integration', () => {
    let component: AgentListComponent;
    let fixture: ComponentFixture<AgentListComponent>;
    let httpMock: HttpTestingController;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AgentListComponent],
            imports: [
                HttpClientTestingModule,
                MatTableModule,
                MatPaginatorModule,
                NoopAnimationsModule
            ],
            providers: [AgentService, NotificationService]
        }).compileComponents();
        
        fixture = TestBed.createComponent(AgentListComponent);
        component = fixture.componentInstance;
        httpMock = TestBed.inject(HttpTestingController);
    });
    
    it('should load and display agents', async () => {
        // Arrange
        const mockAgents: Agent[] = [
            { uid: '1', name: 'Agent 1', status: 'Active' } as Agent
        ];
        
        // Act
        component.ngOnInit();
        fixture.detectChanges();
        
        // Assert HTTP call
        const req = httpMock.expectOne('/api/agents');
        req.flush(mockAgents);
        
        fixture.detectChanges();
        await fixture.whenStable();
        
        // Verify table rows
        const rows = fixture.debugElement.queryAll(By.css('mat-row'));
        expect(rows.length).toBe(1);
    });
});
```

### Test Configuration & Scripts

```json
// karma.conf.js enhancements
module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-headless'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            jasmine: {
                random: true,
                seed: '4321',
                stopOnSpecFailure: false
            },
            clearContext: false
        },
        coverageReporter: {
            dir: require('path').join(__dirname, './coverage/matrix-portal'),
            subdir: '.',
            reporters: [
                { type: 'html' },
                { type: 'text-summary' },
                { type: 'lcov' }
            ],
            check: {
                global: {
                    statements: 80,
                    branches: 75,
                    functions: 80,
                    lines: 80
                }
            }
        },
        reporters: ['progress', 'kjhtml', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        singleRun: false,
        restartOnFileChange: true
    });
};
```

---

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

## Build & Deployment Standards

### Environment Configuration

```typescript
// Environment configuration pattern
export const environment = {
    production: false,
    apiUrl: 'https://localhost:7179',
    auth: {
        domain: 'matrix-portal-dev.auth0.com',
        clientId: 'dev_client_id',
        audience: 'https://matrix-portal-api'
    },
    features: {
        enableAnalytics: false,
        enableErrorReporting: true,
        enablePerformanceMonitoring: false
    },
    logging: {
        level: 'debug',
        enableConsoleLogging: true,
        enableRemoteLogging: false
    }
};

// Configuration service for runtime settings
@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private config = signal<AppConfig>({} as AppConfig);
    
    async loadConfig(): Promise<void> {
        try {
            const response = await fetch('/assets/config/app-config.json');
            const config = await response.json();
            this.config.set(config);
        } catch (error) {
            console.error('Failed to load configuration:', error);
            // Fallback to default configuration
            this.config.set(this.getDefaultConfig());
        }
    }
    
    get<T>(key: string): T | undefined {
        return this.getNestedProperty(this.config(), key);
    }
    
    private getNestedProperty(obj: any, path: string): any {
        return path.split('.').reduce((o, p) => o?.[p], obj);
    }
}
```

### Build Optimization

```json
// angular.json optimizations
{
    "projects": {
        "matrix-portal": {
            "architect": {
                "build": {
                    "builder": "@angular-devkit/build-angular:browser",
                    "options": {
                        "outputPath": "dist/matrix-portal",
                        "index": "src/index.html",
                        "main": "src/main.ts",
                        "polyfills": "src/polyfills.ts",
                        "tsConfig": "tsconfig.app.json",
                        "assets": [
                            "src/favicon.ico",
                            "src/assets"
                        ],
                        "styles": [
                            "src/styles/theme.scss",
                            "src/styles.css"
                        ],
                        "scripts": [],
                        "vendorChunk": true,
                        "extractLicenses": false,
                        "buildOptimizer": false,
                        "sourceMap": true,
                        "optimization": false,
                        "namedChunks": true
                    },
                    "configurations": {
                        "production": {
                            "fileReplacements": [{
                                "replace": "src/environments/environment.ts",
                                "with": "src/environments/environment.prod.ts"
                            }],
                            "optimization": {
                                "scripts": true,
                                "styles": {
                                    "minify": true,
                                    "inlineCritical": true
                                },
                                "fonts": true
                            },
                            "outputHashing": "all",
                            "sourceMap": false,
                            "namedChunks": false,
                            "extractLicenses": true,
                            "vendorChunk": false,
                            "buildOptimizer": true,
                            "budgets": [
                                {
                                    "type": "initial",
                                    "maximumWarning": "2mb",
                                    "maximumError": "5mb"
                                },
                                {
                                    "type": "anyComponentStyle",
                                    "maximumWarning": "6kb",
                                    "maximumError": "10kb"
                                }
                            ]
                        }
                    }
                }
            }
        }
    }
}
```

### CI/CD Pipeline

```yaml
# azure-pipelines.yml
trigger:
- main
- develop

pool:
  vmImage: 'ubuntu-latest'

variables:
  buildConfiguration: 'production'
  nodeVersion: '18.x'

stages:
- stage: Build
  displayName: 'Build and Test'
  jobs:
  - job: BuildJob
    displayName: 'Build Angular Application'
    steps:
    - task: NodeTool@0
      inputs:
        versionSpec: $(nodeVersion)
      displayName: 'Install Node.js'
    
    - task: Cache@2
      inputs:
        key: 'npm | "$(Agent.OS)" | package-lock.json'
        restoreKeys: |
          npm | "$(Agent.OS)"
        path: ~/.npm
      displayName: 'Cache npm'
    
    - script: npm ci
      displayName: 'Install dependencies'
    
    - script: npm run lint
      displayName: 'Run linting'
    
    - script: npm run test -- --watch=false --browsers=ChromeHeadless --code-coverage
      displayName: 'Run unit tests'
    
    - script: npm run build -- --configuration=$(buildConfiguration)
      displayName: 'Build application'
    
    - task: PublishTestResults@2
      inputs:
        testResultsFormat: 'JUnit'
        testResultsFiles: '**/test-results.xml'
        mergeTestResults: true
      displayName: 'Publish test results'
    
    - task: PublishCodeCoverageResults@1
      inputs:
        codeCoverageTool: 'Cobertura'
        summaryFileLocation: 'coverage/cobertura-coverage.xml'
        reportDirectory: 'coverage'
      displayName: 'Publish code coverage'
    
    - task: PublishBuildArtifacts@1
      inputs:
        pathToPublish: 'dist'
        artifactName: 'matrix-portal-build'
      displayName: 'Publish build artifacts'
```

---

*This document serves as the authoritative guide for all Matrix Portal development. All new components, services, and patterns must follow these standards to ensure consistency, maintainability, and code quality across the application.*

interface ValidationError extends BusinessError {
    type: 'VALIDATION_ERROR';
    field: string;
    value?: any;
    constraints: string[];
}

interface ApiError {
    message: string;
    status: number;
    code?: string;
    timestamp: string;
    path: string;
    details?: any;
}

// Error response standardization
interface ErrorResponse {
    success: false;
    error: ApiError;
    data: null;
}

interface SuccessResponse<T> {
    success: true;
    error: null;
    data: T;
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
```

### Component Error Handling Patterns

#### List Component Error Handling

```typescript
export class AgentListComponent extends BaseListComponent<Agent> {
    
    fetchItems(): void {
        this.isLoading = true;
        
        this.agentService.getAgents()
            .pipe(
                takeUntil(this.destroy$),
                catchError((error: HttpErrorResponse) => {
                    this.handleLoadError(error);
                    return of([]); // Return empty array to prevent UI breaking
                })
            )
            .subscribe({
                next: (data: Agent[]) => {
                    this.handleLoadSuccess(data);
                    
                    // Business logic validation
                    if (data.some(agent => !agent.agentUId)) {
                        this.notificationService.addWarning(
                            'Some agents have invalid IDs',
                            'Data Quality'
                        );
                    }
                },
                error: (err: any) => {
                    // This should not execute due to catchError above
                    // But included as safety net
                    this.handleLoadError(err);
                }
            });
    }
    
    onDelete(agent: Agent): void {
        this.handleDelete(agent, () => {
            return this.agentService.deleteAgent(agent.agentUId)
                .pipe(
                    catchError((error: HttpErrorResponse) => {
                        // Handle specific delete errors
                        if (error.status === 409) {
                            this.notificationService.addError(
                                `Cannot delete "${agent.name}". It is currently in use.`,
                                'Agent List',
                                'Remove all dependencies before deleting this agent.'
                            );
                        } else {
                            this.handleDeleteError(error);
                        }
                        return throwError(() => error);
                    })
                );
        });
    }
}
```

#### Detail Component Error Handling

```typescript
export class AgentDetailComponent extends BaseDetailComponent<Agent> {
    
    validateItem(): string[] {
        const errors: string[] = [];
        
        try {
            // Form validation
            this.markFormGroupTouched(this.agentForm);
            if (!this.agentForm.valid) {
                errors.push(...this.getFormValidationErrors(this.agentForm));
            }
            
            // Business validation
            if (this.item) {
                if (this.item.capabilities.length === 0) {
                    errors.push('At least one capability is required.');
                }
                
                if (this.item.name && this.isDuplicateName(this.item.name)) {
                    errors.push('An agent with this name already exists.');
                }
                
                // Cross-field validation
                if (this.item.type === 'Advanced' && this.item.capabilities.length < 3) {
                    errors.push('Advanced agents must have at least 3 capabilities.');
                }
            }
            
        } catch (validationError) {
            console.error('Validation error:', validationError);
            errors.push('An error occurred during validation. Please try again.');
        }
        
        return errors;
    }
    
    protected override onItemLoaded(item: Agent): void {
        try {
            this.populateForm();
            
            // Validate loaded data
            if (!item.agentUId) {
                this.notificationService.addWarning(
                    'Agent data may be incomplete',
                    'Data Quality'
                );
            }
            
        } catch (error) {
            console.error('Error processing loaded agent:', error);
            this.notificationService.addError(
                'Error processing agent data',
                'Agent Detail'
            );
        }
    }
    
    private isDuplicateName(name: string): boolean {
        // This would typically call a service to check for duplicates
        // For now, implement basic logic or return false
        return false;
    }
}
```

### Service Error Handling

```typescript
@Injectable({ providedIn: 'root' })
export class AgentService {
    private http = inject(HttpClient);
    private errorHandlingService = inject(ErrorHandlingService);
    private apiUrl = 'https://localhost:7179/agents';
    
    getAgents(): Observable<Agent[]> {
        return this.http.get<Agent[]>(this.apiUrl).pipe(
            catchError((error: HttpErrorResponse) => {
                this.logError('getAgents', error);
                throw error; // Re-throw to let component handle UI updates
            })
        );
    }
    
    createAgent(agent: Agent): Observable<Agent> {
        // Pre-validation
        const validationErrors = this.validateAgent(agent);
        if (validationErrors.length > 0) {
            const error: BusinessError = {
                type: 'VALIDATION_ERROR',
                message: 'Agent validation failed',
                details: validationErrors.join(', ')
            };
            this.errorHandlingService.handleBusinessError(error);
            return throwError(() => error);
        }
        
        return this.http.post<Agent>(this.apiUrl, agent).pipe(
            catchError((error: HttpErrorResponse) => {
                this.logError('createAgent', error, agent);
                
                // Handle specific creation errors
                if (error.status === 409) {
                    const businessError: BusinessError = {
                        type: 'BUSINESS_RULE_VIOLATION',
                        message: 'An agent with this name already exists',
                        details: 'Please choose a different name'
                    };
                    this.errorHandlingService.handleBusinessError(businessError);
                }
                
                throw error;
            })
        );
    }
    
    updateAgent(agent: Agent): Observable<Agent> {
        return this.http.put<Agent>(`${this.apiUrl}/${agent.agentUId}`, agent).pipe(
            retry(1), // Retry once for transient errors
            catchError((error: HttpErrorResponse) => {
                this.logError('updateAgent', error, agent);
                
                // Handle optimistic locking conflicts
                if (error.status === 409) {
                    const businessError: BusinessError = {
                        type: 'BUSINESS_RULE_VIOLATION',
                        message: 'Agent has been modified by another user',
                        details: 'Please refresh and try again'
                    };
                    this.errorHandlingService.handleBusinessError(businessError);
                }
                
                throw error;
            })
        );
    }
    
    deleteAgent(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
            catchError((error: HttpErrorResponse) => {
                this.logError('deleteAgent', error, { id });
                
                // Handle dependency conflicts
                if (error.status === 409) {
                    const businessError: BusinessError = {
                        type: 'BUSINESS_RULE_VIOLATION',
                        message: 'Cannot delete agent: it is currently in use',
                        details: 'Remove all dependencies before deleting'
                    };
                    this.errorHandlingService.handleBusinessError(businessError);
                }
                
                throw error;
            })
        );
    }
    
    private validateAgent(agent: Agent): string[] {
        const errors: string[] = [];
        
        if (!agent.name?.trim()) {
            errors.push('Agent name is required');
        }
        
        if (!agent.type) {
            errors.push('Agent type is required');
        }
        
        if (!agent.capabilities || agent.capabilities.length === 0) {
            errors.push('At least one capability is required');
        }
        
        return errors;
    }
    
    private logError(operation: string, error: any, data?: any): void {
        const errorInfo = {
            operation,
            error: {
                message: error.message,
                status: error.status,
                url: error.url
            },
            data,
            timestamp: new Date().toISOString()
        };
        
        console.error(`AgentService.${operation} failed:`, errorInfo);
        
        // In production, send to logging service
        // this.loggingService.logError(errorInfo);
    }
}
```

### Error Boundaries and Recovery

#### Component Error Recovery

```typescript
@Component({
    selector: 'app-resilient-component',
    template: `
        <div *ngIf="!hasError; else errorTemplate">
            <!-- Normal content -->
            <div *ngFor="let item of items">{{ item.name }}</div>
        </div>
        
        <ng-template #errorTemplate>
            <div class="error-recovery">
                <mat-icon class="error-icon">error</mat-icon>
                <h3>Something went wrong</h3>
                <p>{{ errorMessage }}</p>
                
                <div class="recovery-actions">
                    <button (click)="retry()" class="btn-primary">
                        <mat-icon>refresh</mat-icon> Try Again
                    </button>
                    
                    <button (click)="goBack()" class="btn-secondary">
                        <mat-icon>arrow_back</mat-icon> Go Back
                    </button>
                    
                    <button (click)="reportIssue()" class="btn-link">
                        <mat-icon>bug_report</mat-icon> Report Issue
                    </button>
                </div>
            </div>
        </ng-template>
    `
})
export class ResilientComponent implements OnInit {
    items: any[] = [];
    hasError = false;
    errorMessage = '';
    private lastOperation: (() => void) | null = null;
    
    ngOnInit(): void {
        this.loadData();
    }
    
    private loadData(): void {
        this.lastOperation = () => this.loadData();
        this.hasError = false;
        
        this.dataService.getData()
            .pipe(
                timeout(30000), // 30 second timeout
                retry({
                    count: 2,
                    delay: (error, retryCount) => timer(retryCount * 1000) // Exponential backoff
                })
            )
            .subscribe({
                next: (data) => {
                    this.items = data;
                    this.hasError = false;
                },
                error: (error) => {
                    this.handleComponentError(error);
                }
            });
    }
    
    private handleComponentError(error: any): void {
        this.hasError = true;
        
        if (error.name === 'TimeoutError') {
            this.errorMessage = 'Request timed out. Please check your connection and try again.';
        } else if (error.status === 0) {
            this.errorMessage = 'Unable to connect to server. Please check your internet connection.';
        } else {
            this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
        
        console.error('Component error:', error);
    }
    
    retry(): void {
        if (this.lastOperation) {
            this.lastOperation();
        }
    }
    
    goBack(): void {
        window.history.back();
    }
    
    reportIssue(): void {
        // Open issue reporting dialog or redirect to support
        this.notificationService.addInfo(
            'Please contact support with the details of this error',
            'Support'
        );
    }
}
```

### Error Monitoring and Logging

```typescript
// Production error monitoring service
@Injectable({ providedIn: 'root' })
export class ErrorMonitoringService {
    private errorCounts = new Map<string, number>();
    private readonly MAX_ERRORS_PER_MINUTE = 10;
    
    logError(error: any, context?: string): void {
        const errorKey = this.getErrorKey(error, context);
        const currentCount = this.errorCounts.get(errorKey) || 0;
        
        // Rate limiting to prevent spam
        if (currentCount >= this.MAX_ERRORS_PER_MINUTE) {
            console.warn('Error rate limit exceeded for:', errorKey);
            return;
        }
        
        this.errorCounts.set(errorKey, currentCount + 1);
        
        // Reset count after 1 minute
        setTimeout(() => {
            this.errorCounts.delete(errorKey);
        }, 60000);
        
        // Log to external service in production
        this.sendToMonitoringService(error, context);
    }
    
    private getErrorKey(error: any, context?: string): string {
        return `${context || 'unknown'}-${error.message || error.toString()}`;
    }
    
    private sendToMonitoringService(error: any, context?: string): void {
        // In production, send to logging service like Application Insights
        const errorReport = {
            message: error.message,
            stack: error.stack,
            context,
            url: window.location.href,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        };
        
        console.error('Error Report:', errorReport);
        
        // Example: Application Insights
        // this.appInsights.trackException({ exception: error });
    }
}
```

---


