import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSourceListComponent } from './data-source-list/data-source-list.component';
import { DataSourceDetailComponent } from './data-source-detail/data-source-detail.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DataSourcesRoutingModule } from './datasources-routing.module';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';

@NgModule({
    declarations: [
        DataSourceListComponent,
        DataSourceDetailComponent,
        CollectionListComponent,
        CollectionDetailComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        MatIconModule,
        FormsModule,
        DataSourcesRoutingModule
    ]
})
export class DataSourcesModule { }

