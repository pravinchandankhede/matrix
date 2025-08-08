import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent, Capability, Feature, Tool } from '../../../datamodels/agent.model';
import { AgentService } from '../../../services/agent.service';
import { BaseDetailComponent } from '../../../shared/base-detail.component';

@Component({
    selector: 'app-agent-detail',
    standalone: false,
    templateUrl: './agent-detail.component.html',
    styleUrls: ['./agent-detail.component.css']
})
export class AgentDetailComponent extends BaseDetailComponent<Agent> implements AfterViewInit {
    // Navigation
    activeSection: string = 'general';
    
    agentForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        protected override route: ActivatedRoute,
        protected override router: Router,
        private agentService: AgentService
    ) {
        super(route, router);
        this.agentForm = this.createForm();
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }

    ngAfterViewInit(): void {
        // Populate form fields for new items after view init
        setTimeout(() => {
            if (this.isNew && this.item) {
                this.populateForm();
            }
        });
    }

    // Base class implementations
    getItemService(): AgentService {
        return this.agentService;
    }

    getItemName(item: Agent): string {
        return item.name || 'Unknown Agent';
    }

    getItemListRoute(): string {
        return '/agents';
    }

    getEntityName(): string {
        return 'Agent';
    }

    getErrorContext(): string {
        return 'Agent Detail';
    }

    getItemId(item: Agent): string {
        return item.agentUId;
    }

    createNewItem(): Agent {
        const newAgent = {
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

        // Populate form with default values
        setTimeout(() => {
            this.populateForm();
        });

        return newAgent;
    }

    validateItem(): string[] {
        const errors: string[] = [];

        // Mark all form controls as touched to show validation errors
        this.markFormGroupTouched(this.agentForm);

        // Check reactive form validation
        if (!this.agentForm.valid) {
            const validationErrors = this.getFormValidationErrors(this.agentForm);
            errors.push(...validationErrors);
        }

        // Validate capabilities, features, and tools
        if (this.item) {
            this.item.capabilities.forEach((capability, index) => {
                if (!capability.name?.trim()) {
                    errors.push(`Capability ${index + 1}: Name is required.`);
                }
            });

            this.item.features.forEach((feature, index) => {
                if (!feature.name?.trim()) {
                    errors.push(`Feature ${index + 1}: Name is required.`);
                }
            });

            this.item.tools.forEach((tool, index) => {
                if (!tool.name?.trim()) {
                    errors.push(`Tool ${index + 1}: Name is required.`);
                }
            });
        }

        return errors;
    }

    updateItemFromForm(): void {
        if (!this.item) return;

        const formValue = this.agentForm.value;

        // Update basic properties from form
        this.item.name = formValue.name?.trim() || '';
        this.item.description = formValue.description?.trim() || '';
        this.item.type = formValue.type?.trim() || '';
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

    // Reactive Forms Methods
    private createForm(): FormGroup {
        return this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            description: [''],
            type: ['', [Validators.required]],
            status: ['Active', [Validators.required]],
            version: ['1.0.0', [Validators.required]]
        });
    }

    private populateForm(): void {
        if (this.item) {
            this.agentForm.patchValue({
                name: this.item.name || '',
                description: this.item.description || '',
                type: this.item.type || '',
                status: this.item.status || 'Active',
                version: this.item.version || '1.0.0'
            });
        }
    }

    // Capability Management
    addCapability(): void {
        if (!this.item) return;
        const newCapability: Capability = {
            capabilityUId: this.generateId(),
            name: '',
            description: '',
            type: 'General',
            createdBy: 'System',
            createdDate: new Date(),
            modifiedBy: 'System',
            modifiedDate: new Date(),
            correlationUId: this.generateId(),
            rowVersion: undefined,
            metadata: []
        };
        this.item.capabilities.push(newCapability);
    }

    removeCapability(index: number): void {
        if (!this.item) return;
        this.item.capabilities.splice(index, 1);
    }

    // Feature Management
    addFeature(): void {
        if (!this.item) return;
        const newFeature: Feature = {
            featureUId: this.generateId(),
            name: '',
            description: '',
            type: 'General',
            configuration: {},
            createdBy: 'System',
            createdDate: new Date(),
            modifiedBy: 'System',
            modifiedDate: new Date(),
            correlationUId: this.generateId(),
            rowVersion: undefined,
            metadata: []
        };
        this.item.features.push(newFeature);
    }

    removeFeature(index: number): void {
        if (!this.item) return;
        this.item.features.splice(index, 1);
    }

    // Tool Management
    addTool(): void {
        if (!this.item) return;
        const newTool: Tool = {
            toolUId: this.generateId(),
            name: '',
            description: '',
            type: 'General',
            configuration: {},
            createdBy: 'System',
            createdDate: new Date(),
            modifiedBy: 'System',
            modifiedDate: new Date(),
            correlationUId: this.generateId(),
            rowVersion: undefined,
            metadata: []
        };
        this.item.tools.push(newTool);
    }

    removeTool(index: number): void {
        if (!this.item) return;
        this.item.tools.splice(index, 1);
    }

    // Navigation methods
    setActiveSection(section: string): void {
        this.activeSection = section;
    }

    // Form validation helper methods
    private markFormGroupTouched(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).forEach(key => {
            const control = formGroup.get(key);
            control?.markAsTouched();

            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        });
    }

    private getFormValidationErrors(form: FormGroup): string[] {
        const errors: string[] = [];
        
        Object.keys(form.controls).forEach(key => {
            const control = form.get(key);
            if (control && !control.valid && (control.dirty || control.touched)) {
                const fieldName = this.getFieldDisplayName(key);
                if (control.errors?.['required']) {
                    errors.push(`${fieldName} is required.`);
                }
                if (control.errors?.['minlength']) {
                    const minLength = control.errors['minlength'].requiredLength;
                    errors.push(`${fieldName} must be at least ${minLength} characters long.`);
                }
                if (control.errors?.['maxlength']) {
                    const maxLength = control.errors['maxlength'].requiredLength;
                    errors.push(`${fieldName} cannot exceed ${maxLength} characters.`);
                }
                if (control.errors?.['email']) {
                    errors.push(`${fieldName} must be a valid email address.`);
                }
                if (control.errors?.['pattern']) {
                    errors.push(`${fieldName} format is invalid.`);
                }
            }
        });
        
        return errors;
    }

    private getFieldDisplayName(fieldName: string): string {
        const fieldNames: { [key: string]: string } = {
            'name': 'Agent Name',
            'description': 'Description',
            'type': 'Agent Type',
            'status': 'Status',
            'version': 'Version'
        };
        
        return fieldNames[fieldName] || fieldName;
    }
}
