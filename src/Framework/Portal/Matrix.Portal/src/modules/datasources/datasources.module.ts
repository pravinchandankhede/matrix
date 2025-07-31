import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSourceListComponent } from './data-source-list/data-source-list.component';
import { DataSourceDetailComponent } from './data-source-detail/data-source-detail.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DataSourcesRoutingModule } from './datasources-routing.module';

@NgModule({
    declarations: [
        DataSourceListComponent,
        DataSourceDetailComponent,
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

