import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataSourceListComponent } from './data-source-list/data-source-list.component';
import { DataSourceDetailComponent } from './data-source-detail/data-source-detail.component';

const routes: Routes = [
    { path: '', component: DataSourceListComponent },
    { path: 'add', component: DataSourceDetailComponent },
    { path: ':id', component: DataSourceDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DataSourcesRoutingModule { }
