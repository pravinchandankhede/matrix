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
    @Input() mode: 'add' | 'edit' | 'view' = 'view';
    @Output() save = new EventEmitter<StructuredConnectionDetails>();
    @Output() cancel = new EventEmitter<void>();
    form!: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        const details = this.dataSource?.connectionDetails as StructuredConnectionDetails;
        this.form = this.fb.group({
            host: [details?.host || ''],
            port: [details?.port || ''],
            databaseName: [details?.databaseName || ''],
            schema: [details?.schema || ''],
            tableList: [details?.tableList?.join(', ') || ''],
            queryTemplate: [details?.queryTemplate || '']
        });
        if (this.mode === 'view') {
            this.form.disable();
        }
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
