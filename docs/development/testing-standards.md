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


