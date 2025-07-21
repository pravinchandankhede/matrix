import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentsRoutingModule } from './agents-routing.module';
import { AgentListComponent } from './agent-list/agent-list.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [AgentListComponent],
    imports: [
        CommonModule,
        AgentsRoutingModule,
        MatIconModule
    ],
})
export class AgentsModule { }
