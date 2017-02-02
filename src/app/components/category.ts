import { Component,Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'category-components',
    template: ` 
     <ion-header>
        <ion-navbar>
        <button ion-button menuToggle>
          <ion-icon name="menu"></ion-icon>
        </button>
        </ion-navbar>
     </ion-header>
     <ion-content> 
        <ion-list>
            <button ion-item *ngFor="let item of categories" (click)="itemSelected(item)">
                {{ item }}
            </button>  
        </ion-list>
    </ion-content>
  `,outputs:['updateCategory : changeCategory']
})

export class CategoryComponent {
    private categories: Array<string>;
    updateCategory: EventEmitter<any> = new EventEmitter();

    constructor() {
        this.categories = ["Mobile", "Electronics", "Home", "Entertainment", "Pet Care", "Education"];

    }

    itemSelected(value) {
        this.updateCategory.emit(value);
    }
}