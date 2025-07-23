import { Component, Input, signal, OnInit } from '@angular/core';
import { Agent } from '../../../datamodels/agent.model';

@Component({
    selector: 'app-agent-detail',
    standalone: false,
    templateUrl: './agent-detail.component.html',
    styleUrls: ['./agent-detail.component.css']
})
export class AgentDetailComponent implements OnInit {
    @Input() agent: Agent | null = null;
    editMode = signal(true); // Start in edit mode for add screen

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
        this.editMode.update(v => !v);
    }
}
