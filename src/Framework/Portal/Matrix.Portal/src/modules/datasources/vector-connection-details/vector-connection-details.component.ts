import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataSource } from '../../../datamodels/data-source.model';

@Component({
    selector: 'app-vector-connection-details',
    standalone: false,
    templateUrl: './vector-connection-details.component.html',
    styleUrls: ['./vector-connection-details.component.css']
})
export class VectorConnectionDetailsComponent implements OnInit {
    @Input() dataSource: DataSource | null = null;
    @Input() mode: 'view' | 'edit' = 'view';
    @Input() readonly: boolean = false;
    @Output() connectionChange = new EventEmitter<any>();

    form!: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        const vectorData = this.dataSource?.vectorDataSource;
        this.form = this.fb.group({
            vectorDbType: [vectorData?.vectorDbType || ''],
            indexName: [vectorData?.indexName || ''],
            embeddingModel: [vectorData?.embeddingModel || ''],
            dimension: [vectorData?.dimension || 0],
            distanceMetric: [vectorData?.distanceMetric || '']
        });

        if (this.mode === 'view' || this.readonly) {
            this.form.disable();
        }

        this.form.valueChanges.subscribe(value => {
            this.connectionChange.emit(value);
        });
    }

    getConnectionValue(key: string): string {
        const vectorData = this.dataSource?.vectorDataSource;
        if (vectorData && key in vectorData) {
            const value = (vectorData as any)[key];
            return value ? value.toString() : '';
        }
        return '';
    }

    hasConnectionDetails(): boolean {
        return !!this.dataSource?.vectorDataSource;
    }

    onSave(): void {
        if (this.form.valid) {
            const connectionData = this.form.value;
            this.connectionChange.emit(connectionData);
        }
    }

    onCancel(): void {
        this.form.reset();
    }
}
