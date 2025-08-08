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
    selectedProvider: string = '';
    selectedType: string = '';

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
        const matchesName = model.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            (model.description?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false);
        const matchesEnabled = this.selectedEnabled ?
            (this.selectedEnabled === 'true' ? model.isEnabled : !model.isEnabled) : true;
        const matchesProvider = this.selectedProvider ?
            (model.provider?.toLowerCase() === this.selectedProvider.toLowerCase()) : true;
        const matchesType = this.selectedType ?
            (model.type?.toLowerCase() === this.selectedType.toLowerCase()) : true;
        return matchesName && matchesEnabled && matchesProvider && matchesType;
    }

    onEnabledFilterChange(enabled: string): void {
        this.selectedEnabled = enabled;
        this.applyFilter();
    }

    onProviderFilterChange(provider: string): void {
        this.selectedProvider = provider;
        this.applyFilter();
    }

    onTypeFilterChange(type: string): void {
        this.selectedType = type;
        this.applyFilter();
    }

    get filteredModels(): Model[] {
        return this.filteredItems;
    }

    get uniqueProviders(): string[] {
        return [...new Set(this.items.map(model => model.provider).filter(p => p !== undefined))] as string[];
    }

    get uniqueTypes(): string[] {
        return [...new Set(this.items.map(model => model.type).filter(t => t !== undefined))] as string[];
    }

    onAdd(): void {
        this.router.navigate(['/models/add'], {
            queryParams: { edit: 'true' }
        });
    }

    onEdit(model: Model): void {
        this.router.navigate(['/models', model.modelUId], {
            queryParams: { edit: 'true' },
            state: { itemName: model.name }
        });
    }

    onView(model: Model): void {
        this.router.navigate(['/models', model.modelUId], {
            queryParams: { edit: 'false' },
            state: { itemName: model.name }
        });
    }

    onSelect(model: Model): void {
        this.router.navigate(['/models', model.modelUId], {
            state: { itemName: model.name }
        });
    }

    onDelete(model: Model): void {
        if (confirm(`Are you sure you want to delete model "${model.name}"?`)) {
            // Simulate delete for now
            this.errorService.addError(`Model "${model.name}" deleted successfully.`, 'Model List');
            this.fetchItems();
        }
    }

    trackByFn(index: number, item: Model): string {
        return item.modelUId;
    }
}
