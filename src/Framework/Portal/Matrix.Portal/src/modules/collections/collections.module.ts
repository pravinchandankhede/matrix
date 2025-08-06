import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';
import { CollectionsRoutingModule } from './collections-routing.module';

@NgModule({
    declarations: [
        CollectionListComponent,
        CollectionDetailComponent],
    imports: [
        CommonModule,
        MatIconModule,
        FormsModule,
        CollectionsRoutingModule
    ]
})
export class CollectionsModule { }
