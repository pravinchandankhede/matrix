import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../../services/model-service';
import { Observable } from 'rxjs';
import { Model } from '../../../datamodels/model';

@Component({
    selector: 'app-model-list',
    standalone: false,
    templateUrl: './model-list.component.html',
    styleUrl: './model-list.component.css'
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

    onSearch(): void {
        this.applyFilter();
    }

    onFilterChange(value: string): void {
        if (value === '') this.filterEnabled = null;
        else this.filterEnabled = value === 'true';
        this.applyFilter();
    }

    addModel(): void {
        // Implement navigation to add model form
    }

    editModel(model: Model): void {
        // Implement navigation to edit model form
    }

    deleteModel(model: Model): void {
        if (confirm(`Are you sure you want to delete model '${model.name}'?`)) {
            this.modelService.deleteModel((model as any).id).subscribe(() => this.loadModels());
        }
    }
}
