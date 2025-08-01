import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '../../../datamodels/data-source.model';

@Component({
    selector: 'app-data-source-blade',
    standalone: false,
    templateUrl: './data-source-blade.component.html',
    styleUrls: ['./data-source-blade.component.css']
})
export class DataSourceBladeComponent implements OnChanges {
    @Input() dataSources: DataSource[] = [];
    @Input() isOpen: boolean = false;
    @Input() showSaveActions: boolean = false; // Whether to show save/cancel buttons
    @Input() title: string = 'Data Sources';
    @Output() close = new EventEmitter<void>();
    @Output() save = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();
    @Output() dataSourceSelected = new EventEmitter<string>();

    // Detail blade state
    selectedDataSourceId: string | null = null;
    detailBladeOpen: boolean = false;

    constructor(private router: Router) { }

    ngOnChanges(changes: SimpleChanges) {
        // Component reactive to input changes
        if (changes['dataSources'] || changes['isOpen']) {
            // Any additional logic when inputs change
        }
    }

    onClose() {
        this.close.emit();
    }

    onSave() {
        this.save.emit();
    }

    onCancel() {
        this.cancel.emit();
    }

    onDataSourceClick(dataSourceId: string) {
        this.selectedDataSourceId = dataSourceId;
        this.detailBladeOpen = true;
        this.dataSourceSelected.emit(dataSourceId);
    }

    onDetailBladeClose() {
        this.detailBladeOpen = false;
        this.selectedDataSourceId = null;
    }

    navigateToAllDataSources() {
        this.router.navigate(['datasources']);
    }
}
