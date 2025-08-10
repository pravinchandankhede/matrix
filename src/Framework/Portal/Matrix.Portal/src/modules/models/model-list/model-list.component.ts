import { Component } from '@angular/core';
import { ModelService } from '../../../services/model.service';
import { Model } from '../../../datamodels/model';
import { BaseListComponent } from '../../../shared/base-list.component';

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

    constructor(private modelService: ModelService) {
        super();
    }

    getEntityName(): string {
        return 'Model';
    }

    getListContext(): string {
        return 'Model List';
    }

    getDetailRoute(): string {
        return '/models';
    }

    fetchItems(): void {
        this.modelService.getModels().subscribe({
            next: (data: Model[]) => {
                this.handleLoadSuccess(data);
            },
            error: (err: any) => {
                this.handleLoadError(err);
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
        this.navigateToAdd();
    }

    onEdit(model: Model): void {
        this.navigateToEdit(model.modelUId);
    }

    onView(model: Model): void {
        this.navigateToDetail(model.modelUId);
    }

    onSelect(model: Model): void {
        this.navigateToDetail(model.modelUId);
    }

    onDelete(model: Model): void {
        this.handleDelete(model, () => {
            // Note: Update this when actual delete service method is available
            this.handleDeleteSuccess(model.name);
        });
    }

    trackByFn(index: number, item: Model): string {
        return item.modelUId;
    }
}
