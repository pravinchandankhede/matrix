import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ShellComponent } from './shell/shell.component';
import { CoreRoutingModule } from './core-routing.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        ShellComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        CoreRoutingModule
    ]
})
export class CoreModule { }
