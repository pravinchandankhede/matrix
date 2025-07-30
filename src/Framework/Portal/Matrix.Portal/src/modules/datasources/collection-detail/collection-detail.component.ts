import { Component, Input, signal, OnInit } from '@angular/core';
import { DataSourceCollection } from '../../../datamodels/data-source-collection.model';
import { Router, ActivatedRoute } from '@angular/router';
// import { DataSourceCollectionService } from '../../../services/data-source-collection.service';

@Component({
    selector: 'app-collection-detail',
    standalone: false,
    templateUrl: './collection-detail.component.html',
    styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent implements OnInit {
    @Input() collection: DataSourceCollection | null = null;
    editMode = signal(false); // Start in view mode

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        // private collectionService: DataSourceCollectionService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id && id !== 'add') {
            this.editMode.set(false);
            this.loadCollection(id);
        } else if (id === 'add') {
            this.editMode.set(true);
            this.initializeNewCollection();
        } else if (!this.collection) {
            this.initializeNewCollection();
        }
    }

    private loadCollection(id: string) {
        // TODO: Replace with actual service call
        // this.collectionService.getCollection(id).subscribe({
        //   next: (collection: DataSourceCollection) => {
        //     this.collection = collection;
        //   },
        //   error: (err: any) => {
        //     // Handle error
        //   }
        // });
    }

    private initializeNewCollection() {
        this.collection = {
            dataSourceCollectionUId: '',
            name: '',
            description: '',
            createdDate: new Date().toISOString(),
            lastModifiedDate: new Date().toISOString(),
            dataSources: [],
            isCustom: false
        };
    }

    toggleEdit() {
        this.editMode.update((v: boolean) => !v);
    }

    goToDataSources() {
        if (this.collection) {
            this.router.navigate(['datasources', 'list'], { queryParams: { collectionId: this.collection.dataSourceCollectionUId } });
        }
    }
}
