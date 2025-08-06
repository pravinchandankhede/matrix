import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChunkListComponent } from './chunk-list/chunk-list.component';
import { ChunkDetailComponent } from './chunk-detail/chunk-detail.component';

const routes: Routes = [
    { path: '', component: ChunkListComponent },
    { path: 'add', component: ChunkDetailComponent },
    { path: ':id', component: ChunkDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChunksRoutingModule { }
