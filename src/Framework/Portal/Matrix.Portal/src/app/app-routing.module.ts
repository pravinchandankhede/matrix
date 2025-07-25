import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell/shell.component';

const routes: Routes = [
    { path: '', component: ShellComponent },
    {
        path: 'models',
        loadChildren: () =>
            import('../modules/models/models.module').then(m => m.ModelsModule)
    },
    {
        path: 'agents',
        loadChildren: () =>
            import('../modules/agents/agents.module').then(m => m.AgentsModule)
    },
    {
        path: 'datasources',
        loadChildren: () =>
            import('../modules/datasources/datasources.module').then(m => m.DataSourcesModule)
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
