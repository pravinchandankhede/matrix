import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelListComponent } from './model-list/model-list.component';
import { ModelsRoutingModule } from './models-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ModelDetailComponent } from './model-detail/model-detail.component';

@NgModule({
    declarations: [
        ModelListComponent,
        ModelDetailComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatIconModule,
        FormsModule,
        ModelsRoutingModule
    ]
})
export class ModelsModule { }
