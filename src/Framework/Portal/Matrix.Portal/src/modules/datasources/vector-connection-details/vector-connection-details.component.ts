import { Component, Input, Output, EventEmitter, OnInit, OnChanges, ViewEncapsulation } from '@angular/core';
import { DataSource } from '../../../datamodels/data-source.model';
import { VectorDbType, DistanceMetric } from '../../../datamodels/base.model';

@Component({
    selector: 'app-vector-connection-details',
    standalone: false,
    templateUrl: './vector-connection-details.component.html',
    styleUrls: ['./vector-connection-details.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class VectorConnectionDetailsComponent implements OnInit, OnChanges {
    @Input() dataSource: DataSource | null = null;
    @Input() mode: 'view' | 'edit' = 'view';
    @Input() readonly: boolean = false;
    @Output() connectionChange = new EventEmitter<any>();

    get vectorDataSource() {
        return this.dataSource?.vectorDataSource!;
    }

    constructor() { }

    ngOnInit() {
        this.initializeVectorDataSource();
    }

    ngOnChanges() {
        this.initializeVectorDataSource();
    }

    private initializeVectorDataSource() {
        if (this.dataSource && !this.dataSource.vectorDataSource) {
            this.dataSource.vectorDataSource = {
                vectorDbType: VectorDbType.Pinecone,
                indexName: '',
                embeddingModel: '',
                dimension: 0,
                distanceMetric: DistanceMetric.Cosine,
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
}
