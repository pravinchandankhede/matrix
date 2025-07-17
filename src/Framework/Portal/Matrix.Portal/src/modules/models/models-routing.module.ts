import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelListComponent } from './model-list/model-list.component';

const routes: Routes = [
    { path: '', component: ModelListComponent },
    //{ path: 'edit/:id', component: StockEditComponent },
    //{ path: 'view/:id', component: StockViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModelsRoutingModule { }
