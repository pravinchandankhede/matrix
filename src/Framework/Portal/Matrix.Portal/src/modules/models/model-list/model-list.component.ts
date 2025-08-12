import { Component, inject } from '@angular/core';
import { ModelService } from '../../../services/model.service';
import { Model } from '../../../datamodels/model';
import { BaseListComponent } from '../../../shared/base-list.component';
import { takeUntil } from 'rxjs/operators';

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

    private modelService = inject(ModelService);

    protected getEntityName(): string {
        return 'Model';
    }

    protected getErrorContext(): string {
        return 'Model List';
    }

    protected getDetailRoute(): string {
        return '/models';
    }

    protected getItemId(model: Model): string {
        return model.modelUId;
    }

    protected getItemName(model: Model): string {
        return model.name || 'Unknown Model';
    }

    protected fetchItems(): void {
        this.modelService.getModels()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (data: Model[]) => {
                    this.handleLoadSuccess(data);
                },
                error: (err: any) => {
                    this.handleLoadError(err);
                }
            });
    }

    protected filterPredicate(model: Model): boolean {
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
        this.navigateToEdit(model.modelUId, this.getItemName(model));
    }

    onView(model: Model): void {
        this.navigateToDetail(model.modelUId, this.getItemName(model));
    }

    onSelect(model: Model): void {
        this.navigateToDetail(model.modelUId, this.getItemName(model));
    }

    onDelete(model: Model): void {
        this.handleDelete(model, () => {
            this.modelService.deleteModel(model.modelUId)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: () => {
                        this.handleDeleteSuccess(model.name);
                    },
                    error: (err: any) => {
                        this.handleDeleteError(err);
                    }
                });
        });
    }
}
