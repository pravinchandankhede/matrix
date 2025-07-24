import { Component } from '@angular/core';
import { ModelService } from '../../../services/model.service';
import { Model } from '../../../datamodels/model';
import { Router } from '@angular/router';
import { BaseListComponent } from '../../../shared/base-list.component';

@Component({
    selector: 'app-model-list',
    standalone: false,
    templateUrl: './model-list.component.html',
    styleUrls: ['./model-list.component.css']
})
export class ModelListComponent extends BaseListComponent<Model> {
    filterEnabled: boolean | null = null;
    showHomeBreadcrumb = false;

    constructor(private modelService: ModelService, private router: Router) {
        super();
    }

    fetchItems(): void {
        this.modelService.getModels().subscribe((models: Model[]) => {
            this.items = models;
            this.applyFilter();
        });
    }

    filterPredicate(model: Model): boolean {
        const matchesSearch = this.searchTerm === '' || model.name.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesEnabled = this.filterEnabled === null || model.isEnabled === this.filterEnabled;
        return matchesSearch && matchesEnabled;
    }

    override onFilterChange(value: string): void {
        this.filterEnabled = value === '' ? null : value === 'true';
        this.applyFilter();
    }

    getStatusBadgeClass(model: Model): string {
        return model.isEnabled ? 'enabled' : 'disabled';
    }

    override ngOnInit(): void {
        this.fetchItems();
        this.showHomeBreadcrumb = window.location.pathname !== '/';
    }

    get filteredModels(): Model[] {
        return this.filteredItems;
    }
}
