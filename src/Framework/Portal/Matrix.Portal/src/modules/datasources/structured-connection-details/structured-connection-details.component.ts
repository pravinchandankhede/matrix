import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataSource } from '../../../datamodels/data-source.model';

@Component({
    selector: 'app-structured-connection-details',
    standalone: false,
    templateUrl: './structured-connection-details.component.html',
    styleUrls: ['./structured-connection-details.component.css']
})
export class StructuredConnectionDetailsComponent implements OnInit {
    @Input() dataSource: DataSource | null = null;
    @Input() mode: 'view' | 'edit' = 'view';
    @Input() readonly: boolean = false;
    @Output() connectionChange = new EventEmitter<any>();

    form!: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        const structuredData = this.dataSource?.structuredDataSource;
        this.form = this.fb.group({
            host: [structuredData?.host || ''],
            port: [structuredData?.port || 0],
            databaseName: [structuredData?.databaseName || ''],
            schema: [structuredData?.schema || ''],
            tableList: [structuredData?.tableList?.join(', ') || ''],
            queryTemplate: [structuredData?.queryTemplate || '']
        });

        if (this.mode === 'view' || this.readonly) {
            this.form.disable();
        }

        this.form.valueChanges.subscribe(value => {
            this.connectionChange.emit(value);
        });
    }

    getConnectionValue(key: string): string {
        const structuredData = this.dataSource?.structuredDataSource;
        if (structuredData && key in structuredData) {
            const value = (structuredData as any)[key];
            return value ? value.toString() : '';
        }
        return '';
    }

    hasConnectionDetails(): boolean {
        return !!this.dataSource?.structuredDataSource;
    }

    onSave(): void {
        if (this.form.valid) {
            const formValue = this.form.value;
            const connectionData = {
                ...formValue,
                tableList: formValue.tableList ? formValue.tableList.split(',').map((t: string) => t.trim()) : []
            };
            this.connectionChange.emit(connectionData);
        }
    }

    onCancel(): void {
        this.form.reset();
    }
}
