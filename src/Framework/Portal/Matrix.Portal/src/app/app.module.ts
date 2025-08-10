import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { ShellComponent } from './shell/shell.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { NotificationPanelComponent } from './notification-panel/notification-panel.component';

@NgModule({
  declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        ProfileComponent,
        ShellComponent,
        BreadcrumbComponent,
        NotificationPanelComponent
  ],
  imports: [
    BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
