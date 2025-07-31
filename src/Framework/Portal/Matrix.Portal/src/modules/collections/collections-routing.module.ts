import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';

const routes: Routes = [
    { path: '', component: CollectionListComponent },
    { path: 'add', component: CollectionDetailComponent },
    { path: ':id', component: CollectionDetailComponent }    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CollectionsRoutingModule { }
