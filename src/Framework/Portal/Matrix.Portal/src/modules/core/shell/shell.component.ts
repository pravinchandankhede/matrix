import { Component } from '@angular/core';

@Component({
  selector: 'app-shell',
  standalone: false,
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css'
})
export class ShellComponent {
    profileOpen = false;
    userName = 'John Doe';
    userEmail = 'john.doe@example.com';
    userRole = 'Administrator';

    onProfileClick() {
        this.profileOpen = true;
    }

    onProfileClose() {
        this.profileOpen = false;
    }
}
