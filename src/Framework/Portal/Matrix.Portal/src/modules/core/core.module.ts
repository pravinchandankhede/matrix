import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../app/header/header.component';
import { FooterComponent } from '../../app/footer/footer.component';
import { ShellComponent } from '../../app/shell/shell.component';
import { CoreRoutingModule } from './core-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from '../../app/profile/profile.component';

@NgModule({
    declarations: [
        //HeaderComponent,
        //FooterComponent,
        //ShellComponent,
        //ProfileComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        CoreRoutingModule,
    ],
    exports: [
        //ProfileComponent,
        //HeaderComponent,
        //FooterComponent,
    ]
})
export class CoreModule { }
