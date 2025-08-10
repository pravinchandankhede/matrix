import { Component, Output, EventEmitter } from '@angular/core';
import { ErrorService } from '../../services/error.service';

@Component({
    selector: 'app-header',
    standalone: false,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    @Output() profileClick = new EventEmitter<void>();

    constructor(public errorService: ErrorService) { }

    get unreadNotificationCount(): number {
        return this.errorService.getUnreadCount();
    }

    toggleNotifications(): void {
        this.errorService.toggleNotificationPanel();
    }
}
