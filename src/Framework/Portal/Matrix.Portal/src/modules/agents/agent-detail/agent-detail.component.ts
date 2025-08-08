import { Component } from '@angular/core';
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
export class AgentDetailComponent extends BaseDetailComponent<Agent> {
    // Navigation
    activeSection: string = 'general';

    // Form helper properties
    capabilitiesString = '';
    featuresString = '';
    toolsString = '';

    constructor(
        protected override route: ActivatedRoute,
        protected override router: Router,
        private agentService: AgentService,
        private errorService: ErrorService
    ) {
        super(route, router);
    }

    loadItem(id: string): void {
        this.isLoading = true;
        this.agentService.getAgent(id).subscribe({
            next: (agent: Agent) => {
                this.item = agent;
                this.updateFormHelpers();
                this.isLoading = false;
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

    saveItem(): void {
        if (!this.item) return;

        // Basic validation
        if (!this.item.name || !this.item.name.trim()) {
            this.errorService.addError('Agent name is required.', 'Agent Detail');
            return;
        }

        if (!this.item.type || !this.item.type.trim()) {
            this.errorService.addError('Agent type is required.', 'Agent Detail');
            return;
        }

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
                        queryParams: { edit: 'false' }
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
                    this.updateFormHelpers();
                    this.errorService.addError(
                        `Agent "${updatedAgent.name}" updated successfully.`,
                        'Agent Detail'
                    );
                },
                error: (err: any) => {
                    this.handleError(err, 'Update agent');
                    this.errorService.addError('Failed to update agent.', 'Agent Detail');
                    this.isLoading = false;
                }
            });
        }
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

    private updateFormHelpers(): void {
        if (this.item) {
            this.capabilitiesString = this.item.capabilities.map(c => c.name).join(', ');
            this.featuresString = this.item.features.map(f => f.name).join(', ');
            this.toolsString = this.item.tools.map(t => t.name).join(', ');
        }
    }

    private updateItemFromForm(): void {
        if (!this.item) return;

        // Update capabilities from string
        this.item.capabilities = this.capabilitiesString
            .split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0)
            .map(name => ({
                capabilityUId: this.generateId(),
                name,
                description: '',
                type: 'General',
                createdBy: 'System',
                createdDate: new Date(),
                modifiedBy: 'System',
                modifiedDate: new Date(),
                correlationUId: this.generateId(),
                rowVersion: undefined,
                metadata: []
            } as Capability));

        // Update features from string
        this.item.features = this.featuresString
            .split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0)
            .map(name => ({
                featureUId: this.generateId(),
                name,
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
            } as Feature));

        // Update tools from string
        this.item.tools = this.toolsString
            .split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0)
            .map(name => ({
                toolUId: this.generateId(),
                name,
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
            } as Tool));

        this.item.modifiedBy = 'System';
        this.item.modifiedDate = new Date();
    }
}
