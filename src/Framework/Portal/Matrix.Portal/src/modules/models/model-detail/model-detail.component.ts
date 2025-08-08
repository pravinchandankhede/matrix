import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Model } from '../../../datamodels/model';
import { ModelService } from '../../../services/model.service';
import { ErrorService } from '../../../services/error.service';
import { BaseDetailComponent } from '../../../shared/base-detail.component';

@Component({
    selector: 'app-model-detail',
    standalone: false,
    templateUrl: './model-detail.component.html',
    styleUrls: ['./model-detail.component.css']
})
export class ModelDetailComponent extends BaseDetailComponent<Model> {
    // Navigation
    activeSection: string = 'general';

    modelForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private modelService: ModelService,
        private errorService: ErrorService,
        protected override route: ActivatedRoute,
        protected override router: Router
    ) {
        super(route, router);
        this.modelForm = this.createForm();
    }

    public loadItem(id: string): void {
        this.modelService.getModel(id).subscribe({
            next: (model) => {
                this.item = model;
                this.populateForm(model);
            },
            error: (error) => console.error('Error loading model:', error)
        });
    }

    public createNewItem(): Model {
        return {
            modelUId: this.generateId(),
            name: '',
            type: '',
            version: '',
            description: '',
            provider: '',
            endpoint: '',
            apiKey: '',
            region: '',
            isEnabled: true,
            createdBy: 'System',
            createdDate: new Date(),
            modifiedBy: 'System',
            modifiedDate: new Date(),
            correlationUId: this.generateId(),
            rowVersion: undefined,
            metadata: []
        };
    }

    public saveItem(): void {
        if (this.modelForm.valid) {
            const formValue = this.modelForm.value;
            const modelToSave: Model = {
                ...this.item,
                ...formValue,
                modifiedBy: 'Current User',
                modifiedDate: new Date()
            };

            const saveOperation = this.item?.modelUId
                ? this.modelService.updateModel(modelToSave)
                : this.modelService.createModel(modelToSave);

            saveOperation.subscribe({
                next: (savedModel) => {
                    this.item = savedModel;
                    console.log('Model saved successfully');
                    this.router.navigate(['/models']);
                },
                error: (error) => console.error('Error saving model:', error)
            });
        }
    }

    public deleteItem(): void {
        if (this.item?.modelUId && confirm('Are you sure you want to delete this model?')) {
            this.modelService.deleteModel(this.item.modelUId).subscribe({
                next: () => {
                    console.log('Model deleted successfully');
                    this.router.navigate(['/models']);
                },
                error: (error) => console.error('Error deleting model:', error)
            });
        }
    }

    private createForm(): FormGroup {
        return this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(100)]],
            type: ['', Validators.maxLength(50)],
            version: ['', Validators.maxLength(20)],
            description: ['', Validators.maxLength(500)],
            provider: ['', Validators.maxLength(100)],
            endpoint: ['', Validators.maxLength(500)],
            apiKey: ['', Validators.maxLength(200)],
            region: ['', Validators.maxLength(50)],
            isEnabled: [true]
        });
    }

    private populateForm(model: Model): void {
        this.modelForm.patchValue({
            name: model.name,
            type: model.type,
            version: model.version,
            description: model.description,
            provider: model.provider,
            endpoint: model.endpoint,
            apiKey: model.apiKey,
            region: model.region,
            isEnabled: model.isEnabled
        });
    }

    // Navigation methods
    setActiveSection(section: string): void {
        this.activeSection = section;
    }

    get isFormValid(): boolean {
        return this.modelForm.valid;
    }

    get isEditMode(): boolean {
        return !!this.item?.modelUId;
    }
}
