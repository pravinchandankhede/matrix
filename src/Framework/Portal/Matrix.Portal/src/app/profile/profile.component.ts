import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-profile',
    standalone: false,
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    @Input() name: string = 'Pravin C';
    @Input() email: string = 'pravinc@example.com';
    @Input() role: string = 'Administrator';
    @Input() open: boolean = false;
    @Output() openChange = new EventEmitter<boolean>();

    close() {
        this.open = false;
        this.openChange.emit(false);
    }
}
