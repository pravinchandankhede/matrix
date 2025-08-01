import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSourceListComponent } from './data-source-list/data-source-list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DataSourcesRoutingModule } from './datasources-routing.module';
import { DataSourceDetailComponent } from './data-source-detail/data-source-detail.component';
import { StructuredConnectionDetailsComponent } from './structured-connection-details/structured-connection-details.component';
import { VectorConnectionDetailsComponent } from './vector-connection-details/vector-connection-details.component';
import { DataSourceBladeComponent } from './data-source-blade/data-source-blade.component';
import { DataSourceDetailBladeComponent } from './data-source-detail-blade/data-source-detail-blade.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [
        DataSourceListComponent,
        DataSourceDetailComponent,
        StructuredConnectionDetailsComponent,
        VectorConnectionDetailsComponent,
        DataSourceBladeComponent,
        DataSourceDetailBladeComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        MatIconModule,
        FormsModule,
        DataSourcesRoutingModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    exports: [
        DataSourceBladeComponent,
        DataSourceDetailBladeComponent
    ]
})
export class DataSourcesModule { }

