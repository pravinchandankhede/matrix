import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelListComponent } from './model-list/model-list.component';
import { ModelDetailComponent } from './model-detail/model-detail.component';

const routes: Routes = [
    { path: '', component: ModelListComponent },
    { path: 'add', component: ModelDetailComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModelsRoutingModule { }
