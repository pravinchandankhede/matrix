import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSource } from '../../../datamodels/data-source.model';
import { DataSourceService } from '../../../services/data-source.service';
import { BaseDetailComponent } from '../../../shared/base-detail.component';
import { DataSourceType, AccessMode, AuthenticationType } from '../../../datamodels/base.model';

@Component({
    selector: 'app-data-source-detail',
    standalone: false,
    templateUrl: './data-source-detail.component.html',
    styleUrls: ['./data-source-detail.component.css']
})
export class DataSourceDetailComponent extends BaseDetailComponent<DataSource> {
    dataSourceForm: FormGroup;
    dataSourceTypes = Object.values(DataSourceType);
    accessModes = Object.values(AccessMode);
    authenticationTypes = Object.values(AuthenticationType);

    constructor(
        private fb: FormBuilder,
        private dataSourceService: DataSourceService,
        route: ActivatedRoute,
        router: Router
    ) {
        super(route, router);
        this.dataSourceForm = this.createForm();
    }

    public loadItem(id: string): void {
        this.dataSourceService.getDataSource(id).subscribe({
            next: (dataSource) => {
                this.item = dataSource;
                this.populateForm(dataSource);
            },
            error: (error) => console.error('Error loading data source:', error)
        });
    }

    public createNewItem(): DataSource {
        return {
            dataSourceUId: '',
            name: '',
            type: DataSourceType.Structured,
            subType: '',
            description: '',
            owner: '',
            isActive: true,
            accessMode: AccessMode.ReadOnly,
            authenticationType: AuthenticationType.None,
            isCustom: false,
            createdBy: 'Current User',
            createdDate: new Date(),
            modifiedBy: 'Current User',
            modifiedDate: new Date(),
            correlationUId: '',
            rowVersion: new Uint8Array(),
            metadata: []
        };
    }

    public saveItem(): void {
        if (!this.item) {
            console.error('No item to save');
            return;
        }

        if (this.dataSourceForm.valid) {
            const formValue = this.dataSourceForm.value;
            const dataSourceToSave: DataSource = {
                ...this.item,
                ...formValue,
                modifiedBy: 'Current User',
                modifiedDate: new Date()
            };

            const saveOperation = this.item.dataSourceUId
                ? this.dataSourceService.updateDataSource(dataSourceToSave)
                : this.dataSourceService.createDataSource(dataSourceToSave);

            saveOperation.subscribe({
                next: (savedDataSource) => {
                    this.item = savedDataSource;
                    console.log('Data source saved successfully');
                    this.router.navigate(['/datasources']);
                },
                error: (error) => console.error('Error saving data source:', error)
            });
        }
    }

    public deleteItem(): void {
        if (this.item?.dataSourceUId && confirm('Are you sure you want to delete this data source?')) {
            this.dataSourceService.deleteDataSource(this.item.dataSourceUId).subscribe({
                next: () => {
                    console.log('Data source deleted successfully');
                    this.router.navigate(['/datasources']);
                },
                error: (error) => console.error('Error deleting data source:', error)
            });
        }
    }

    private createForm(): FormGroup {
        return this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(100)]],
            type: ['', Validators.required],
            subType: ['', Validators.maxLength(50)],
            description: ['', Validators.maxLength(500)],
            owner: ['', [Validators.required, Validators.maxLength(100)]],
            isActive: [true],
            accessMode: ['', Validators.required],
            authenticationType: ['', Validators.required],
            isCustom: [false]
        });
    }

    private populateForm(dataSource: DataSource): void {
        this.dataSourceForm.patchValue({
            name: dataSource.name,
            type: dataSource.type,
            subType: dataSource.subType,
            description: dataSource.description,
            owner: dataSource.owner,
            isActive: dataSource.isActive,
            accessMode: dataSource.accessMode,
            authenticationType: dataSource.authenticationType,
            isCustom: dataSource.isCustom
        });
    }

    get isFormValid(): boolean {
        return this.dataSourceForm.valid;
    }

    get isEditMode(): boolean {
        return !!this.item?.dataSourceUId;
    }
}
