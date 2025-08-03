import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataSource, VectorConnectionDetails } from '../../../datamodels/data-source.model';

@Component({
    selector: 'app-vector-connection-details',
    standalone: false,
    templateUrl: './vector-connection-details.component.html',
    styleUrls: ['./vector-connection-details.component.css']
})
export class VectorConnectionDetailsComponent implements OnInit {
    @Input() dataSource!: DataSource;
    @Input() connectionDetails?: VectorConnectionDetails;
    @Input() readonly: boolean = false;
    @Input() mode: 'add' | 'edit' | 'view' = 'view';
    @Output() save = new EventEmitter<VectorConnectionDetails>();
    @Output() cancel = new EventEmitter<void>();
    form!: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        // Use connectionDetails input if provided, otherwise fallback to dataSource.connectionDetails
        const details = this.connectionDetails || (this.dataSource?.connectionDetails as VectorConnectionDetails);
        this.form = this.fb.group({
            vectorDbType: [details?.vectorDbType || ''],
            indexName: [details?.indexName || ''],
            embeddingModel: [details?.embeddingModel || ''],
            dimension: [details?.dimension || ''],
            distanceMetric: [details?.distanceMetric || '']
        });
        if (this.mode === 'view' || this.readonly) {
            this.form.disable();
        }
    }

    onSave() {
        this.save.emit(this.form.value);
    }

    onCancel() {
        this.cancel.emit();
    }
}
