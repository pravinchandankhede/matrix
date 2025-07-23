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

    constructor(private router: Router, private route: ActivatedRoute) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.breadcrumbs = this.buildBreadcrumbs(this.route.root);
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
}

