import { Component, Input, signal, OnInit } from '@angular/core';
import { DataSource } from '../../../datamodels/data-source.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-data-source-detail',
    standalone: false,
    templateUrl: './data-source-detail.component.html',
    styleUrls: ['./data-source-detail.component.css']
})
export class DataSourceDetailComponent implements OnInit {
    @Input() dataSource: DataSource | null = null;
    editMode = signal(true); // Start in edit mode for add screen

    constructor(private router: Router) { }

    ngOnInit() {
        if (!this.dataSource) {
            this.dataSource = {
                dataSourceId: '',
                name: '',
                type: 'Structured',
                subType: '',
                description: '',
                tags: [],
                owner: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                isActive: true,
                accessMode: 'ReadWrite',
                authenticationType: 'APIKey',
                connectionDetails: {}
            };
        }
    }

    toggleEdit() {
        this.editMode.update((v: boolean) => !v);
    }

    onSave() {
        if (this.dataSource) {
            // TODO: Implement save logic with DataSourceService
            console.log('Saving data source:', this.dataSource);
            this.router.navigate(['/datasources']);
        }
    }
}

