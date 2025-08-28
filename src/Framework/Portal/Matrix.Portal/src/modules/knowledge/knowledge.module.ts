import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnowledgeRoutingModule } from './knowledge-routing.module';
import { KnowledgeListComponent } from './knowledge-list/knowledge-list.component';
import { MatIconModule } from '@angular/material/icon';
import { KnowledgeDetailComponent } from './knowledge-detail/knowledge-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [KnowledgeListComponent, KnowledgeDetailComponent],
    imports: [
        CommonModule,
        KnowledgeRoutingModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule
    ],
})
export class KnowledgeModule { }
