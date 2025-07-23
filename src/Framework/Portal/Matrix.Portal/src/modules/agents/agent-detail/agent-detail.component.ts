import { Component, Input, signal, OnInit } from '@angular/core';
import { Agent } from '../../../datamodels/agent.model';
import { AgentService } from '../../../services/agent.service';

@Component({
    selector: 'app-agent-detail',
    standalone: false,
    templateUrl: './agent-detail.component.html',
    styleUrls: ['./agent-detail.component.css']
})
export class AgentDetailComponent implements OnInit {
    @Input() agent: Agent | null = null;
    editMode = signal(true); // Start in edit mode for add screen

    constructor(private agentService: AgentService) { }

    ngOnInit() {
        if (!this.agent) {
            this.agent = {
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
    }

    toggleEdit() {
        this.editMode.update((v: boolean) => !v);
    }

    onSave() {
        if (this.agent) {
            this.agentService.addAgent(this.agent).subscribe({
                next: (result) => {
                    // Optionally show success message or navigate
                    alert('Agent added successfully!');
                },
                error: (err) => {
                    alert('Failed to add agent.');
                }
            });
        }
    }
}
