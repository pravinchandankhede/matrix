import { Component } from '@angular/core';
import { ModelService } from '../../../services/model.service';
import { Model } from '../../../datamodels/model';
import { Router } from '@angular/router';
import { BaseListComponent } from '../../../shared/base-list.component';
import { ErrorService } from '../../../services/error.service';

@Component({
    selector: 'app-model-list',
    standalone: false,
    templateUrl: './model-list.component.html',
    styleUrls: ['./model-list.component.css']
})
export class ModelListComponent extends BaseListComponent<Model> {
    selectedEnabled: string = '';
    showHomeBreadcrumb = false;

    constructor(
        private modelService: ModelService,
        private router: Router,
        private errorService: ErrorService
    ) {
        super();
    }

    fetchItems(): void {
        this.modelService.getModels().subscribe({
            next: (data: Model[]) => {
                this.items = data;
                this.applyFilter();
                if (this.items.length === 0) {
                    this.errorService.addError('No models found.', 'Model List');
                }
            },
            error: (err: any) => {
                let message = 'Failed to load models.';
                if (err) {
                    if ([0, 502, 503, 504].includes(err.status)) {
                        message = 'Cannot connect to model service. Please check your network or server.';
                    } else if (err.error && typeof err.error === 'string') {
                        message = err.error;
                    } else if (err.message) {
                        message = err.message;
                    }
                }
                console.error('Model list loading error:', err);
                this.errorService.addError(message, 'Model List');
            }
        });
    }

    filterPredicate(model: Model): boolean {
        const matchesName = model.name.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesEnabled = this.selectedEnabled
            ? model.isEnabled.toString() === this.selectedEnabled
            : true;
        return matchesName && matchesEnabled;
    }

    override onFilterChange(value: string): void {
        this.selectedEnabled = value;
        this.applyFilter();
    }

    get filteredModels(): Model[] {
        return this.filteredItems;
    }
}
