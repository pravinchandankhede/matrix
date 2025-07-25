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

    constructor(private agentService: AgentService, private router: Router) { }

    ngOnInit() {
        if (!this.agent) {
            this.agent = {
                agentUId: '',
                name: '',
                description: '',
                type: '',
                capabilities: [],
                status: 'Active',
                version: '',
                createdDate: new Date().toISOString(),
                lastUpdatedDate: new Date().toISOString(),
                metadata: {},
                features: [],
                integratedTools: []
            };
        }

        // Initialize string representations for form
        this.capabilitiesString = this.agent.capabilities.join(', ');
        this.featuresString = this.agent.features.join(', ');
        this.integratedToolsString = this.agent.integratedTools.join(', ');
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
