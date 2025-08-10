import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
    label: string;
    url: string;
}

@Component({
    selector: 'app-breadcrumb',
    standalone: false,
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {
    breadcrumbs: Breadcrumb[] = [];
    showHomeBreadcrumb = false;

    constructor(private router: Router, private route: ActivatedRoute) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.breadcrumbs = this.buildBreadcrumbs(this.route.root);
            this.showHomeBreadcrumb = this.router.url !== '/';
            this.resolveBreadcrumbNames();
        });
    }

    private buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
        const children: ActivatedRoute[] = route.children;
        if (children.length === 0) {
            return breadcrumbs;
        }
        for (const child of children) {
            const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
            if (routeURL !== '') {
                url += `/${routeURL}`;
                const label = child.snapshot.data['breadcrumb'] || this.formatLabel(routeURL);
                breadcrumbs.push({ label, url });
            }
            return this.buildBreadcrumbs(child, url, breadcrumbs);
        }
        return breadcrumbs;
    }

    private formatLabel(str: string): string {
        return str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    private resolveBreadcrumbNames(): void {
        // Check if we have navigation state with item name
        const navigation = this.router.getCurrentNavigation();
        const state = navigation?.extras?.state || (history.state as any);
        
        if (state && state.itemName) {
            // Look for the last breadcrumb (which should be the detail screen) and update its label
            this.breadcrumbs.forEach((breadcrumb, index) => {
                const urlParts = breadcrumb.url.split('/');
                if (urlParts.length >= 3) {
                    const possibleUid = urlParts[2]; // the potential UID
                    
                    // Check if this looks like a UID (contains hyphens, proper length)
                    if (this.isUid(possibleUid)) {
                        this.breadcrumbs[index].label = state.itemName;
                    }
                }
            });
        } else {
            // Fallback: try to get the name from current state if available
            const currentState = history.state;
            if (currentState && currentState.itemName) {
                this.breadcrumbs.forEach((breadcrumb, index) => {
                    const urlParts = breadcrumb.url.split('/');
                    if (urlParts.length >= 3) {
                        const possibleUid = urlParts[2];
                        if (this.isUid(possibleUid)) {
                            this.breadcrumbs[index].label = currentState.itemName;
                        }
                    }
                });
            }
        }
    }

    private isUid(str: string): boolean {
        // Check if string looks like a UID (has hyphens and reasonable length)
        return str.includes('-') && str.length > 20 && /^[a-f0-9-]+$/i.test(str);
    }
}
