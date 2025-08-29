import { Component, AfterViewInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Knowledge, DataSourceCollection, Model, DataSource, Chunk } from '../../../datamodels';
import { KnowledgeService } from '../../../services/knowledge.service';
import { DataSourceService } from '../../../services/data-source.service';
import { DataSourceCollectionService } from '../../../services/data-source-collection.service';
import { ChunkService } from '../../../services/chunk.service';
import { BaseDetailComponent } from '../../../shared/base-detail.component';
import { takeUntil } from 'rxjs/operators';

// Indexing interfaces
interface IndexingRun {
    runId: string;
    startTime: Date;
    endTime?: Date;
    status: 'Running' | 'Successful' | 'Failed' | 'Cancelled';
    documentsProcessed: number;
    totalDocuments: number;
    errorCount: number;
    hasLogs: boolean;
    errorMessage?: string;
}

interface IndexingStatus {
    status: string;
    lastRun: Date | null;
    duration: string | null;
    documentsIndexed: number;
    errorCount: number;
}

@Component({
    selector: 'app-knowledge-detail',
    standalone: false,
    templateUrl: './knowledge-detail.component.html',
    styleUrls: ['./knowledge-detail.component.css']
})
export class KnowledgeDetailComponent extends BaseDetailComponent<Knowledge> implements AfterViewInit {
    // Navigation
    activeSection: string = 'general';

    knowledgeForm: FormGroup;

    // Service injections
    private fb = inject(FormBuilder);
    private knowledgeService = inject(KnowledgeService);
    private dataSourceService = inject(DataSourceService);
    private dataSourceCollectionService = inject(DataSourceCollectionService);
    private chunkService = inject(ChunkService);

    // Data properties
    availableOutputDataSources: DataSource[] = [];
    availableChunkStrategies: Chunk[] = [];
    availableDataSourceCollections: DataSourceCollection[] = [];

    // Indexing properties
    isIndexingRunning: boolean = false;
    indexingProgress: number = 0;
    currentIndexingStep: string = '';
    indexingHistory: IndexingRun[] = [];
    filteredIndexingHistory: IndexingRun[] = [];
    indexingHistoryFilter: string = 'all';
    lastIndexingStatus: IndexingStatus = {
        status: 'Never Run',
        lastRun: null,
        duration: null,
        documentsIndexed: 0,
        errorCount: 0
    };

    constructor() {
        super();
        this.knowledgeForm = this.createForm();
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.loadAvailableDataSources();
        this.loadAvailableChunkStrategies();
        this.loadAvailableDataSourceCollections();
        this.loadIndexingHistory();
    }

    ngAfterViewInit(): void {
        // Populate form fields for new items after view init
        setTimeout(() => {
            if (this.isNew && this.item) {
                this.populateForm();
            }
        });
    }

    // Load available data sources from service
    private loadAvailableDataSources(): void {
        this.dataSourceService.getDataSources()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (dataSources: DataSource[]) => {
                    // Filter for data sources that can be used as output
                    this.availableOutputDataSources = dataSources.filter(ds =>
                        ds.isActive && (ds.type === 'Vector' || ds.type === 'Structured' || ds.type === 'External')
                    );
                },
                error: (err: any) => {
                    console.error('Failed to load data sources:', err);
                    this.availableOutputDataSources = [];
                }
            });
    }

    // Load available chunk strategies from service
    private loadAvailableChunkStrategies(): void {
        this.chunkService.getChunks()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (chunks: Chunk[]) => {
                    this.availableChunkStrategies = chunks;
                },
                error: (err: any) => {
                    console.error('Failed to load chunk strategies:', err);
                    this.availableChunkStrategies = [];
                }
            });
    }

    // Load available data source collections from service
    private loadAvailableDataSourceCollections(): void {
        this.dataSourceCollectionService.getDataSourceCollections()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (collections: DataSourceCollection[]) => {
                    // Filter collections based on availability (all collections for now)
                    this.availableDataSourceCollections = collections;
                },
                error: (err: any) => {
                    console.error('Failed to load data source collections:', err);
                    this.availableDataSourceCollections = [];
                }
            });
    }

    // Base class implementations
    getItemService(): KnowledgeService {
        return this.knowledgeService;
    }

    getItemName(item: Knowledge): string {
        return item.name || 'Unknown Knowledge';
    }

    getItemListRoute(): string {
        return '/knowledge';
    }

    getEntityName(): string {
        return 'Knowledge';
    }

    getErrorContext(): string {
        return 'Knowledge Detail';
    }

    getItemId(item: Knowledge): string {
        return item.knowledgeUId;
    }

    createNewItem(): Knowledge {
        const newKnowledge: Knowledge = {
            knowledgeUId: this.generateId(),
            name: '',
            description: '',
            type: '',
            dataSourceCollection: {} as DataSourceCollection,
            model: {} as Model,
            status: 'Active',
            outputDataSource: {} as DataSource,
            chunkStrategy: {} as Chunk,
            version: '1.0.0',
            createdBy: 'System',
            createdDate: new Date(),
            modifiedBy: 'System',
            modifiedDate: new Date(),
            correlationUId: this.generateId(),
            rowVersion: new Uint8Array(),
            metadata: []
        };

        // Populate form with default values
        setTimeout(() => {
            this.populateForm();
        });

        return newKnowledge;
    }

    validateItem(): string[] {
        const errors: string[] = [];

        // Mark all form controls as touched to show validation errors
        this.markFormGroupTouched(this.knowledgeForm);

        // Check reactive form validation
        if (!this.knowledgeForm.valid) {
            const validationErrors = this.getFormValidationErrors(this.knowledgeForm);
            errors.push(...validationErrors);
        }

        return errors;
    }

    updateItemFromForm(): void {
        if (!this.item) return;

        const formValue = this.knowledgeForm.value;

        // Update basic properties from form
        this.item.name = formValue.name?.trim() || '';
        this.item.description = formValue.description?.trim() || '';
        this.item.type = formValue.type?.trim() || '';
        this.item.status = formValue.status || 'Active';
        this.item.version = formValue.version || '1.0.0';

        this.item.modifiedBy = 'System';
        this.item.modifiedDate = new Date();
    }

    // Lifecycle hooks
    protected override onItemLoaded(_item: Knowledge): void {
        this.populateForm();
    }

    protected override onItemUpdated(): void {
        this.populateForm();
    }

    // Reactive Forms Methods
    private createForm(): FormGroup {
        return this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            description: [''],
            type: ['', [Validators.required]],
            status: ['Active', [Validators.required]],
            version: ['1.0.0', [Validators.required]]
        });
    }

    private populateForm(): void {
        if (this.item) {
            this.knowledgeForm.patchValue({
                name: this.item.name || '',
                description: this.item.description || '',
                type: this.item.type || '',
                status: this.item.status || 'Active',
                version: this.item.version || '1.0.0'
            });
        }
    }

    // Navigation methods
    setActiveSection(section: string): void {
        this.activeSection = section;
    }

    // Data source helper methods
    trackByDataSourceId(index: number, dataSource: any): string {
        return dataSource.dataSourceUId;
    }

    trackByChunkId(index: number, chunk: any): string {
        return chunk.chunkUId;
    }

    getDataSourceIcon(type: string): string {
        const iconMap: { [key: string]: string } = {
            'Structured': 'storage',
            'Vector': 'scatter_plot',
            'External': 'api',
            'Multimedia': 'perm_media',
            'Streaming': 'stream',
            'Proprietary': 'business',
            'SemiStructured': 'description',
            'Unstructured': 'folder_open'
        };
        return iconMap[type] || 'source';
    }

    // Configuration selection methods
    selectOutputDataSource(dataSource: any): void {
        this.item!.outputDataSource = dataSource;
        // Mark form as dirty for change detection
        this.knowledgeForm.markAsDirty();
    }

    selectChunkStrategy(chunk: any): void {
        this.item!.chunkStrategy = chunk;
        // Mark form as dirty for change detection
        this.knowledgeForm.markAsDirty();
    }

    // Handle data source collection selection
    onDataSourceCollectionChange(): void {
        // Mark form as dirty when data source collection changes
        this.knowledgeForm.markAsDirty();
    }

    // Form validation helper methods
    private markFormGroupTouched(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).forEach(key => {
            const control = formGroup.get(key);
            control?.markAsTouched();

            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        });
    }

    private getFormValidationErrors(form: FormGroup): string[] {
        const errors: string[] = [];

        Object.keys(form.controls).forEach(key => {
            const control = form.get(key);
            if (control && !control.valid && (control.dirty || control.touched)) {
                const fieldName = this.getFieldDisplayName(key);
                if (control.errors?.['required']) {
                    errors.push(`${fieldName} is required.`);
                }
                if (control.errors?.['minlength']) {
                    const minLength = control.errors['minlength'].requiredLength;
                    errors.push(`${fieldName} must be at least ${minLength} characters long.`);
                }
                if (control.errors?.['maxlength']) {
                    const maxLength = control.errors['maxlength'].requiredLength;
                    errors.push(`${fieldName} cannot exceed ${maxLength} characters.`);
                }
                if (control.errors?.['email']) {
                    errors.push(`${fieldName} must be a valid email address.`);
                }
                if (control.errors?.['pattern']) {
                    errors.push(`${fieldName} format is invalid.`);
                }
            }
        });

        return errors;
    }

    private getFieldDisplayName(fieldName: string): string {
        const fieldNames: { [key: string]: string } = {
            'name': 'Knowledge Name',
            'description': 'Description',
            'type': 'Knowledge Type',
            'status': 'Status',
            'version': 'Version'
        };

        return fieldNames[fieldName] || fieldName;
    }

    // Indexing methods
    getOverallIndexingStatus(): string {
        return this.lastIndexingStatus.status.toLowerCase().replace(' ', '-');
    }

    getIndexingStatusIcon(): string {
        const statusIcons: { [key: string]: string } = {
            'Never Run': 'info',
            'Successful': 'check_circle',
            'Failed': 'error',
            'Running': 'hourglass_empty',
            'Cancelled': 'cancel'
        };
        return statusIcons[this.lastIndexingStatus.status] || 'info';
    }

    getIndexingStatusText(): string {
        return this.lastIndexingStatus.status;
    }

    getLastIndexingRun(): string {
        if (!this.lastIndexingStatus.lastRun) {
            return 'Never';
        }
        return this.formatRelativeTime(this.lastIndexingStatus.lastRun);
    }

    getLastIndexingDuration(): string {
        return this.lastIndexingStatus.duration || 'N/A';
    }

    getIndexedDocumentsCount(): string {
        return this.lastIndexingStatus.documentsIndexed.toString();
    }

    hasIndexingHistory(): boolean {
        return this.indexingHistory && this.indexingHistory.length > 0;
    }

    runIndexing(): void {
        if (this.isIndexingRunning) return;

        this.isIndexingRunning = true;
        this.indexingProgress = 0;
        this.currentIndexingStep = 'Initializing indexing process...';

        // Create new run record
        const newRun: IndexingRun = {
            runId: this.generateRunId(),
            startTime: new Date(),
            status: 'Running',
            documentsProcessed: 0,
            totalDocuments: 100, // This would come from actual data
            errorCount: 0,
            hasLogs: true
        };

        this.indexingHistory.unshift(newRun);
        this.filterIndexingHistory();

        // Simulate indexing progress
        this.simulateIndexingProgress(newRun);
    }

    private simulateIndexingProgress(run: IndexingRun): void {
        const steps = [
            'Connecting to data sources...',
            'Analyzing document structure...',
            'Processing documents...',
            'Building search index...',
            'Optimizing index...',
            'Finalizing indexing...'
        ];

        let stepIndex = 0;
        const progressInterval = setInterval(() => {
            this.indexingProgress += Math.random() * 15 + 5; // Random progress between 5-20%

            if (stepIndex < steps.length) {
                this.currentIndexingStep = steps[stepIndex];
                stepIndex++;
            }

            run.documentsProcessed = Math.floor((this.indexingProgress / 100) * run.totalDocuments);

            if (this.indexingProgress >= 100) {
                this.indexingProgress = 100;
                this.currentIndexingStep = 'Indexing completed successfully!';

                // Complete the run
                run.endTime = new Date();
                run.status = 'Successful';
                run.documentsProcessed = run.totalDocuments;

                // Update last status
                this.lastIndexingStatus = {
                    status: 'Successful',
                    lastRun: run.endTime,
                    duration: this.calculateDuration(run.startTime, run.endTime),
                    documentsIndexed: run.documentsProcessed,
                    errorCount: 0
                };

                this.isIndexingRunning = false;
                this.filterIndexingHistory();
                clearInterval(progressInterval);
            }
        }, 1000);
    }

    refreshIndexingStatus(): void {
        this.loadIndexingHistory();
        // In a real implementation, this would refresh from the service
    }

    viewIndexingLogs(): void {
        // In a real implementation, this would open a logs dialog or navigate to logs page
        console.log('View indexing logs');
    }

    loadIndexingHistory(): void {
        // In a real implementation, this would load from a service
        // For now, we'll keep the existing history or initialize with sample data
        if (this.indexingHistory.length === 0) {
            this.initializeSampleIndexingHistory();
        }
        this.filterIndexingHistory();
    }

    private initializeSampleIndexingHistory(): void {
        const sampleHistory: IndexingRun[] = [
            {
                runId: 'IDX-001',
                startTime: new Date(Date.now() - 86400000), // 1 day ago
                endTime: new Date(Date.now() - 86400000 + 300000), // 5 minutes duration
                status: 'Successful',
                documentsProcessed: 150,
                totalDocuments: 150,
                errorCount: 0,
                hasLogs: true
            },
            {
                runId: 'IDX-002',
                startTime: new Date(Date.now() - 172800000), // 2 days ago
                endTime: new Date(Date.now() - 172800000 + 180000), // 3 minutes duration
                status: 'Failed',
                documentsProcessed: 75,
                totalDocuments: 120,
                errorCount: 5,
                hasLogs: true,
                errorMessage: 'Connection timeout to data source'
            }
        ];

        this.indexingHistory = sampleHistory;

        // Set last status from most recent run
        if (sampleHistory.length > 0) {
            const lastRun = sampleHistory[0];
            this.lastIndexingStatus = {
                status: lastRun.status,
                lastRun: lastRun.endTime || lastRun.startTime,
                duration: this.calculateDuration(lastRun.startTime, lastRun.endTime),
                documentsIndexed: lastRun.documentsProcessed,
                errorCount: lastRun.errorCount
            };
        }
    }

    filterIndexingHistory(): void {
        if (!this.indexingHistory) {
            this.filteredIndexingHistory = [];
            return;
        }

        switch (this.indexingHistoryFilter) {
            case 'successful':
                this.filteredIndexingHistory = this.indexingHistory.filter(run => run.status === 'Successful');
                break;
            case 'failed':
                this.filteredIndexingHistory = this.indexingHistory.filter(run => run.status === 'Failed');
                break;
            case 'running':
                this.filteredIndexingHistory = this.indexingHistory.filter(run => run.status === 'Running');
                break;
            default:
                this.filteredIndexingHistory = [...this.indexingHistory];
        }
    }

    trackByRunId(index: number, run: IndexingRun): string {
        return run.runId;
    }

    calculateDuration(startTime: Date, endTime?: Date): string {
        if (!endTime) return 'Running...';

        const durationMs = endTime.getTime() - startTime.getTime();
        const minutes = Math.floor(durationMs / 60000);
        const seconds = Math.floor((durationMs % 60000) / 1000);

        if (minutes > 0) {
            return `${minutes}m ${seconds}s`;
        } else {
            return `${seconds}s`;
        }
    }

    getRunStatusIcon(status: string): string {
        const statusIcons: { [key: string]: string } = {
            'Successful': 'check_circle',
            'Failed': 'error',
            'Running': 'hourglass_empty',
            'Cancelled': 'cancel'
        };
        return statusIcons[status] || 'info';
    }

    viewRunDetails(run: IndexingRun): void {
        // In a real implementation, this would open a details dialog
        console.log('View run details:', run);
    }

    downloadRunLogs(run: IndexingRun): void {
        // In a real implementation, this would download the log file
        console.log('Download logs for run:', run.runId);
    }

    retryIndexing(run: IndexingRun): void {
        // In a real implementation, this would retry the specific failed run
        console.log('Retry indexing for run:', run.runId);
        this.runIndexing(); // For now, just start a new run
    }

    private generateRunId(): string {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 8);
        return `IDX-${timestamp}-${random}`.toUpperCase();
    }

    private formatRelativeTime(date: Date): string {
        const now = new Date();
        const diff = now.getTime() - date.getTime();

        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return 'Just now';
        }
    }
}
