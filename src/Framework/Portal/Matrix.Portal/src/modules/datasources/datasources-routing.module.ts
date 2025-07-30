import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataSourceListComponent } from './data-source-list/data-source-list.component';
import { DataSourceDetailComponent } from './data-source-detail/data-source-detail.component';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';

const routes: Routes = [
    { path: '', component: CollectionListComponent },
    { path: 'add', component: CollectionDetailComponent },
    { path: ':id', component: CollectionDetailComponent },
    {
        path: 'datasources', children: [
            { path: '', component: DataSourceListComponent },
            { path: 'list', component: DataSourceListComponent },
            { path: 'add', component: DataSourceDetailComponent },
            { path: ':id', component: DataSourceDetailComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DataSourcesRoutingModule { }
