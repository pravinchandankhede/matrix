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
        this.agentService.getAgents().subscribe({
            next: (agents: Agent[]) => {
                this.item = agents.find(a => a.agentUId === id) || null;
                if (this.item) {
                    this.updateFormHelpers();
                } else {
                    this.errorService.addError('Agent not found.', 'Agent Detail');
                }
                this.isLoading = false;
            },
            error: (err: any) => {
                this.handleError(err, 'Load agent');
                this.errorService.addError('Failed to load agent details.', 'Agent Detail');
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
            rowVersion: new Uint8Array(),
            metadata: []
        };
    }

    saveItem(): void {
        if (!this.item) return;

        this.updateItemFromForm();

        // For now, just simulate save since we don't have create/update endpoints
        this.editMode = false;
        this.errorService.addError(
            `Agent "${this.item.name}" ${this.isNew ? 'created' : 'updated'} successfully.`,
            'Agent Detail'
        );

        if (this.isNew) {
            this.router.navigate(['/agents', this.item.agentUId], {
                queryParams: { edit: 'false' }
            });
        }
    }

    deleteItem(): void {
        if (!this.item || this.isNew) return;

        // For now, just simulate delete
        this.errorService.addError(
            `Agent "${this.item.name}" deleted successfully.`,
            'Agent Detail'
        );
        this.router.navigate(['/agents']);
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
                rowVersion: new Uint8Array(),
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
                rowVersion: new Uint8Array(),
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
                rowVersion: new Uint8Array(),
                metadata: []
            } as Tool));

        this.item.modifiedBy = 'System';
        this.item.modifiedDate = new Date();
    }

    private generateId(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
