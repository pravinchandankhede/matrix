import { Component } from '@angular/core';

@Component({
  selector: 'app-shell',
  standalone: false,
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css'
})
export class ShellComponent {
    profileOpen = false;
    userName = 'Pravin C';
    userEmail = 'pravinc@example.com';
    userRole = 'Administrator';

    //onProfileClick() {
    //    this.profileOpen = true;
    //}

    //onProfileClose() {
    //    this.profileOpen = false;
    //}
}
