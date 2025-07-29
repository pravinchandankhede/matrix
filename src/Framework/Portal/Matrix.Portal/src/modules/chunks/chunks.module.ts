import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChunkListComponent } from './chunk-list/chunk-list.component';
import { ChunkDetailComponent } from './chunk-detail/chunk-detail.component';
import { ChunksRoutingModule } from './chunks-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChunkListComponent,
    ChunkDetailComponent
  ],
  imports: [
      CommonModule,
      ChunksRoutingModule,
      MatIconModule,
      FormsModule
  ]
})
export class ChunksModule { }
