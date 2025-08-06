import { Component, Input, Output, EventEmitter, OnInit, OnChanges, ViewEncapsulation } from '@angular/core';
import { DataSource } from '../../../datamodels/data-source.model';

@Component({
    selector: 'app-structured-connection-details',
    standalone: false,
    templateUrl: './structured-connection-details.component.html',
    styleUrls: ['./structured-connection-details.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class StructuredConnectionDetailsComponent implements OnInit, OnChanges {
    @Input() dataSource: DataSource | null = null;
    @Input() mode: 'view' | 'edit' = 'view';
    @Input() readonly: boolean = false;
    @Output() connectionChange = new EventEmitter<any>();

    tableListString: string = '';

    get structuredDataSource() {
        return this.dataSource?.structuredDataSource!;
    }

    constructor() { }

    ngOnInit() {
        this.initializeStructuredDataSource();
        this.updateTableListString();
    }

    ngOnChanges() {
        this.initializeStructuredDataSource();
        this.updateTableListString();
    }

    private initializeStructuredDataSource() {
        if (this.dataSource && !this.dataSource.structuredDataSource) {
            this.dataSource.structuredDataSource = {
                host: '',
                port: 0,
                databaseName: '',
                schema: '',
                tableList: [],
                queryTemplate: '',
                createdBy: '',
                createdDate: new Date(),
                modifiedBy: '',
                modifiedDate: new Date(),
                correlationUId: '',
                rowVersion: new Uint8Array(),
                metadata: []
            };
        }
    }

    private updateTableListString() {
        if (this.dataSource?.structuredDataSource?.tableList) {
            this.tableListString = this.dataSource.structuredDataSource.tableList.join(', ');
        }
    }

    onTableListChange() {
        if (this.dataSource?.structuredDataSource) {
            this.dataSource.structuredDataSource.tableList = this.tableListString
                .split(',')
                .map(table => table.trim())
                .filter(table => table.length > 0);
        }
    }
}
