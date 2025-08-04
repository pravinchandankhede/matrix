import { Component, Input, signal, OnInit } from '@angular/core';
import { Agent } from '../../../datamodels/agent.model';
import { AgentService } from '../../../services/agent.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-agent-detail',
    standalone: false,
    templateUrl: './agent-detail.component.html',
    styleUrls: ['./agent-detail.component.css']
})
export class AgentDetailComponent implements OnInit {
    @Input() agent: Agent | null = null;
    editMode = signal(true); // Start in edit mode for add screen

    // Form helper properties
    capabilitiesString = '';
    featuresString = '';
    integratedToolsString = '';
    tagsString = '';

    constructor(private agentService: AgentService, private router: Router) { }

    ngOnInit() {
        if (!this.agent) {
            this.agent = {
                agentUId: '',
                id: '',
                name: '',
                description: '',
                type: '',
                capabilities: [],
                status: 'Active',
                version: '',
                createdBy: '',
                createdAt: new Date().toISOString(),
                updatedBy: '',
                updatedAt: new Date().toISOString(),
                isActive: true,
                metadata: {},
                tags: [],
                features: [],
                integratedTools: []
            };
        }

        // Initialize string representations for form
        this.capabilitiesString = this.agent.capabilities.join(', ');
        this.featuresString = this.agent.features.join(', ');
        this.integratedToolsString = this.agent.integratedTools.join(', ');
        this.tagsString = this.agent.tags ? this.agent.tags.join(', ') : '';
    }

    toggleEdit() {
        this.editMode.update((v: boolean) => !v);
    }

    onSave() {
        if (this.agent) {
            // Convert string inputs back to arrays
            this.agent.capabilities = this.capabilitiesString.split(',').map(s => s.trim()).filter(s => s.length > 0);
            this.agent.features = this.featuresString.split(',').map(s => s.trim()).filter(s => s.length > 0);
            this.agent.integratedTools = this.integratedToolsString.split(',').map(s => s.trim()).filter(s => s.length > 0);
            this.agent.tags = this.tagsString.split(',').map(s => s.trim()).filter(s => s.length > 0);
            
            // Update audit fields
            this.agent.updatedAt = new Date().toISOString();
            // updatedBy should be set based on current user context

            this.agentService.addAgent(this.agent).subscribe({
                next: (result: any) => {
                    alert('Agent added successfully!');
                    this.router.navigate(['/agents']);
                },
                error: (err: any) => {
                    alert('Failed to add agent.');
                }
            });
        }
    }
}
