import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ShellComponent } from './shell/shell.component';
import { CoreRoutingModule } from './core-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        ShellComponent,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        CoreRoutingModule
    ],
    exports: [
        ProfileComponent
    ]
})
export class CoreModule { }
