import { OnInit, Directive } from '@angular/core';

@Directive()
export abstract class BaseListComponent<T> implements OnInit {
    items: T[] = [];
    filteredItems: T[] = [];
    searchTerm: string = '';
    filterValue: any = null;

    abstract fetchItems(): void;
    abstract filterPredicate(item: T): boolean;

    ngOnInit(): void {
        this.fetchItems();
    }

    onSearch(): void {
        this.applyFilter();
    }

    onFilterChange(value: any): void {
        this.filterValue = value;
        this.applyFilter();
    }

    applyFilter(): void {
        this.filteredItems = this.items.filter(item => this.filterPredicate(item));
    }
}
