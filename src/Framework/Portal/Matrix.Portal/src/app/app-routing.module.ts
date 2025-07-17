import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'models',
        loadChildren: () =>
            import('../modules/models/models.module').then(m => m.ModelsModule)
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
