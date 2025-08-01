import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataSourceListComponent } from './data-source-list/data-source-list.component';
import { DataSourceDetailComponent as BladeDataSourceDetailComponent } from './data-source-detail/data-source-detail.component';

const routes: Routes = [
    { path: '', component: DataSourceListComponent },
    { path: 'list', component: DataSourceListComponent },
    { path: 'add', component: BladeDataSourceDetailComponent },
    { path: ':id', component: BladeDataSourceDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DataSourcesRoutingModule { }
