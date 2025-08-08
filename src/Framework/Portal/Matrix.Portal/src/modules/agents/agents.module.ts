import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentsRoutingModule } from './agents-routing.module';
import { AgentListComponent } from './agent-list/agent-list.component';
import { MatIconModule } from '@angular/material/icon';
import { AgentDetailComponent } from './agent-detail/agent-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AgentListComponent, AgentDetailComponent],
    imports: [
        CommonModule,
        AgentsRoutingModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule
    ],
})
export class AgentsModule { }
