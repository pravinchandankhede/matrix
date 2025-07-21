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
    //{
    //    path: 'portfolio',
    //    loadChildren: () =>
    //        import('../portfolio/portfolio.module').then(m => m.PortfolioModule)
    //},
    // Add similar lazy routes for mutual-fund, portfolio, reports if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
