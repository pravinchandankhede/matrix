import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: false,
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'Matrix.Portal';
    profileOpen = false;
    userName = 'Pravin C';
    userEmail = 'pravinc@example.com';
    userRole = 'Administrator';

    currentYear = new Date().getFullYear();   

    onProfileClick() {
        this.profileOpen = true;
    }

    onProfileClose() {
        this.profileOpen = false;
    }
}
