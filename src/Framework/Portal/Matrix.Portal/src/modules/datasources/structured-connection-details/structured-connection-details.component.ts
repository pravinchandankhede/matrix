import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataSource, StructuredConnectionDetails } from '../../../datamodels/data-source.model';

@Component({
    selector: 'app-structured-connection-details',
    standalone: false,
    templateUrl: './structured-connection-details.component.html',
    styleUrls: ['./structured-connection-details.component.css']
})
export class StructuredConnectionDetailsComponent implements OnInit {
    @Input() dataSource!: DataSource;
    @Input() connectionDetails?: StructuredConnectionDetails;
    @Input() readonly: boolean = false;
    @Input() mode: 'add' | 'edit' | 'view' = 'view';
    @Output() save = new EventEmitter<StructuredConnectionDetails>();
    @Output() cancel = new EventEmitter<void>();
    form!: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        // Use connectionDetails input if provided, otherwise fallback to dataSource.ConnectionDetails
        const details = this.connectionDetails || (this.dataSource?.ConnectionDetails as StructuredConnectionDetails);
        this.form = this.fb.group({
            host: [details?.Host || ''],
            port: [details?.Port || ''],
            databaseName: [details?.DatabaseName || ''],
            schema: [details?.Schema || ''],
            tableList: [details?.TableList?.join(', ') || ''],
            queryTemplate: [details?.QueryTemplate || '']
        });
        if (this.mode === 'view' || this.readonly) {
            this.form.disable();
        }
    }

    getConnectionValue(key: string): string {
        const details = this.connectionDetails || (this.dataSource?.ConnectionDetails as StructuredConnectionDetails);
        const value = details?.[key as keyof StructuredConnectionDetails];
        if (typeof value === 'string') {
            return value;
        } else if (typeof value === 'number') {
            return value.toString();
        } else if (Array.isArray(value)) {
            return value.join(', ');
        }
        return '';
    }

    getTableListArray(): string[] {
        const details = this.connectionDetails || (this.dataSource?.ConnectionDetails as StructuredConnectionDetails);
        return details?.TableList || [];
    }

    getTableListDisplay(): boolean {
        const tableList = this.getTableListArray();
        return tableList && tableList.length > 0;
    }

    onSave() {
        const value = this.form.value;
        value.tableList = value.tableList ? value.tableList.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0) : [];
        this.save.emit(value);
    }

    onCancel() {
        this.cancel.emit();
    }
}
