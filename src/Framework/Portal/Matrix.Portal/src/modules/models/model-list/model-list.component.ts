import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../../services/model-service';
import { Model } from '../../../datamodels/model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-model-list',
    standalone: false,
    templateUrl: './model-list.component.html',
    styleUrls: ['./model-list.component.css']
})
export class ModelListComponent implements OnInit {
    models: Model[] = [];
    filteredModels: Model[] = [];
    searchTerm: string = '';
    filterEnabled: boolean | null = null;

    constructor(private modelService: ModelService) { }

    ngOnInit(): void {
        this.loadModels();
    }

    loadModels(): void {
        this.modelService.getModels().subscribe(models => {
            this.models = models;
            this.applyFilter();
        });
    }

    applyFilter(): void {
        this.filteredModels = this.models.filter(model => {
            const matchesSearch = this.searchTerm === '' || model.name.toLowerCase().includes(this.searchTerm.toLowerCase());
            const matchesEnabled = this.filterEnabled === null || model.isEnabled === this.filterEnabled;
            return matchesSearch && matchesEnabled;
        });
    }

    /**
     * Returns a CSS class for the status badge based on model enabled state.
     */
    getStatusBadgeClass(model: Model): string {
        return model.isEnabled ? 'enabled' : 'disabled';
    }

    /**
     * Handles search input and applies filter.
     */
    onSearch(): void {
        this.applyFilter();
    }

    /**
     * Handles filter dropdown change and applies filter.
     */
    onFilterChange(value: string): void {
        this.filterEnabled = value === '' ? null : value === 'true';
        this.applyFilter();
    }

    /**
     * Navigates to the add model form (implement navigation logic here).
     */
    addModel(): void {
        // TODO: Implement navigation to add model form using Angular Router
    }

    /**
     * Navigates to the edit model form (implement navigation logic here).
     */
    editModel(model: Model): void {
        // TODO: Implement navigation to edit model form using Angular Router
    }

    /**
     * Deletes a model after confirmation, then reloads the list.
     */
    deleteModel(model: Model): void {
        // TODO: Replace confirm with a modern dialog for better UX
        if (confirm(`Are you sure you want to delete model '${model.name}'?`)) {
            this.modelService.deleteModel((model as any).id).subscribe(() => this.loadModels());
        }
    }
}
