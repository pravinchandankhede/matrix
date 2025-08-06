import { OnInit, OnDestroy, Directive, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive()
export abstract class BaseDetailComponent<T> implements OnInit, OnDestroy {
    @Input() editMode: boolean = false;
    
    item: T | null = null;
    isLoading: boolean = false;
    isNew: boolean = false;
    itemId: string | null = null;
    
    protected destroy$ = new Subject<void>();

    constructor(
        protected route: ActivatedRoute,
        protected router: Router
    ) {}

    ngOnInit(): void {
        this.route.paramMap.pipe(
            takeUntil(this.destroy$)
        ).subscribe(params => {
            this.itemId = params.get('id');
            if (this.itemId) {
                this.isNew = false;
                this.loadItem(this.itemId);
            } else {
                this.isNew = true;
                this.item = this.createNewItem();
            }
        });

        this.route.queryParamMap.pipe(
            takeUntil(this.destroy$)
        ).subscribe(params => {
            this.editMode = params.get('edit') === 'true';
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    abstract loadItem(id: string): void;
    abstract createNewItem(): T;
    abstract saveItem(): void;
    abstract deleteItem(): void;

    onEdit(): void {
        this.editMode = true;
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { edit: 'true' },
            queryParamsHandling: 'merge'
        });
    }

    onCancelEdit(): void {
        this.editMode = false;
        if (this.isNew) {
            this.goBack();
        } else {
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: { edit: 'false' },
                queryParamsHandling: 'merge'
            });
            if (this.itemId) {
                this.loadItem(this.itemId);
            }
        }
    }

    onSave(): void {
        this.saveItem();
    }

    onDelete(): void {
        if (confirm('Are you sure you want to delete this item?')) {
            this.deleteItem();
        }
    }

    goBack(): void {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    protected handleError(error: any, operation: string): void {
        console.error(`${operation} failed:`, error);
        // You can inject ErrorService here if needed
    }
}
