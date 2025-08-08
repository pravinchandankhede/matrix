import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent, Capability, Feature, Tool } from '../../../datamodels/agent.model';
import { AgentService } from '../../../services/agent.service';
import { ErrorService } from '../../../services/error.service';
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
        private agentService: AgentService,
        private errorService: ErrorService
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

    loadItem(id: string): void {
        this.isLoading = true;
        this.agentService.getAgent(id).subscribe({
            next: (agent: Agent) => {
                this.item = agent;
                this.populateForm();
                this.isLoading = false;
                // Update browser state for breadcrumb without triggering navigation
                history.replaceState({ ...history.state, itemName: agent.name }, '');
            },
            error: (err: any) => {
                this.handleError(err, 'Load agent');
                if (err.status === 404) {
                    this.errorService.addError('Agent not found.', 'Agent Detail');
                } else {
                    this.errorService.addError('Failed to load agent details.', 'Agent Detail');
                }
                this.isLoading = false;
            }
        });
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

    saveItem(): void {
        if (!this.item) return;

        // Mark all form controls as touched to show validation errors
        this.markFormGroupTouched(this.agentForm);

        // Check form validation
        if (!this.agentForm.valid) {
            const validationErrors = this.getFormValidationErrors(this.agentForm);
            validationErrors.forEach(error => {
                this.errorService.addError(error, 'Agent Detail');
            });
            return;
        }

        // Validate capabilities, features, and tools
        const itemValidationErrors = this.validateItems();
        if (itemValidationErrors.length > 0) {
            itemValidationErrors.forEach(error => {
                this.errorService.addError(error, 'Agent Detail');
            });
            return;
        }

        // Update item from form values
        this.updateItemFromForm();

        if (this.isNew) {
            // Create new agent
            this.isLoading = true;
            this.agentService.createAgent(this.item).subscribe({
                next: (createdAgent: Agent) => {
                    this.item = createdAgent;
                    this.isNew = false;
                    this.editMode = false;
                    this.isLoading = false;
                    this.errorService.addError(
                        `Agent "${createdAgent.name}" created successfully.`,
                        'Agent Detail'
                    );
                    this.router.navigate(['/agents', createdAgent.agentUId], {
                        queryParams: { edit: 'false' },
                        state: { itemName: createdAgent.name }
                    });
                },
                error: (err: any) => {
                    this.handleError(err, 'Create agent');
                    this.errorService.addError('Failed to create agent.', 'Agent Detail');
                    this.isLoading = false;
                }
            });
        } else {
            // Update existing agent
            this.isLoading = true;
            this.agentService.updateAgent(this.item).subscribe({
                next: (updatedAgent: Agent) => {
                    this.item = updatedAgent;
                    this.editMode = false;
                    this.isLoading = false;
                    this.populateForm();
                    this.errorService.addError(
                        `Agent "${updatedAgent.name}" updated successfully.`,
                        'Agent Detail'
                    );
                    // Update browser state for breadcrumb without navigation
                    history.replaceState({ ...history.state, itemName: updatedAgent.name }, '');
                },
                error: (err: any) => {
                    this.handleError(err, 'Update agent');
                    this.errorService.addError('Failed to update agent.', 'Agent Detail');
                    this.isLoading = false;
                }
            });
        }
    }

    private validateItems(): string[] {
        const errors: string[] = [];

        if (!this.item) return errors;

        // Validate capabilities
        this.item.capabilities.forEach((capability, index) => {
            if (!capability.name?.trim()) {
                errors.push(`Capability ${index + 1}: Name is required.`);
            }
        });

        // Validate features
        this.item.features.forEach((feature, index) => {
            if (!feature.name?.trim()) {
                errors.push(`Feature ${index + 1}: Name is required.`);
            }
        });

        // Validate tools
        this.item.tools.forEach((tool, index) => {
            if (!tool.name?.trim()) {
                errors.push(`Tool ${index + 1}: Name is required.`);
            }
        });

        return errors;
    }

    deleteItem(): void {
        if (!this.item || this.isNew) return;

        this.isLoading = true;
        this.agentService.deleteAgent(this.item.agentUId).subscribe({
            next: () => {
                this.errorService.addError(
                    `Agent "${this.item!.name}" deleted successfully.`,
                    'Agent Detail'
                );
                this.router.navigate(['/agents']);
            },
            error: (err: any) => {
                this.handleError(err, 'Delete agent');
                this.errorService.addError('Failed to delete agent.', 'Agent Detail');
                this.isLoading = false;
            }
        });
    }

    // Navigation methods
    setActiveSection(section: string): void {
        this.activeSection = section;
    }

    private updateItemFromForm(): void {
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
}
