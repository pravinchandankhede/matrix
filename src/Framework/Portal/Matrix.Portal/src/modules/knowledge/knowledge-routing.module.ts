import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KnowledgeListComponent } from './knowledge-list/knowledge-list.component';
import { KnowledgeDetailComponent } from './knowledge-detail/knowledge-detail.component';

const routes: Routes = [
    { path: '', component: KnowledgeListComponent },
    { path: 'add', component: KnowledgeDetailComponent },
    { path: ':id', component: KnowledgeDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KnowledgeRoutingModule { }
