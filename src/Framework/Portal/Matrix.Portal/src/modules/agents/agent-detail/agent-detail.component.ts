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
                AgentUId: '',
                Id: '',
                Name: '',
                Description: '',
                Type: '',
                Capabilities: [],
                Status: 'Active',
                Version: '',
                CreatedBy: '',
                CreatedAt: new Date().toISOString(),
                UpdatedBy: '',
                UpdatedAt: new Date().toISOString(),
                IsActive: true,
                Metadata: {},
                Tags: [],
                Features: [],
                IntegratedTools: []
            };
        }

        // Initialize string representations for form
        this.capabilitiesString = this.agent.Capabilities.join(', ');
        this.featuresString = this.agent.Features.join(', ');
        this.integratedToolsString = this.agent.IntegratedTools.join(', ');
        this.tagsString = this.agent.Tags ? this.agent.Tags.join(', ') : '';
    }

    toggleEdit() {
        this.editMode.update((v: boolean) => !v);
    }

    onSave() {
        if (this.agent) {
            // Convert string inputs back to arrays
            this.agent.Capabilities = this.capabilitiesString.split(',').map(s => s.trim()).filter(s => s.length > 0);
            this.agent.Features = this.featuresString.split(',').map(s => s.trim()).filter(s => s.length > 0);
            this.agent.IntegratedTools = this.integratedToolsString.split(',').map(s => s.trim()).filter(s => s.length > 0);
            this.agent.Tags = this.tagsString.split(',').map(s => s.trim()).filter(s => s.length > 0);
            
            // Update audit fields
            this.agent.UpdatedAt = new Date().toISOString();
            // UpdatedBy should be set based on current user context

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
