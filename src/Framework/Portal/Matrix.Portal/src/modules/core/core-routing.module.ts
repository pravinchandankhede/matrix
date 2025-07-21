import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from '../../app/shell/shell.component';

const routes: Routes = [
    //{ path: '', component: ShellComponent },
    //{ path: 'edit/:id', component: StockEditComponent },
    //{ path: 'view/:id', component: StockViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }
