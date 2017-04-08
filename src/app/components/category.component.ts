import { Component, Output, Inject } from '@angular/core';
import { Events, NavController } from 'ionic-angular';
import { ILookupService, LookupService } from '../services/lookup.service';

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
                {{ item.name }}
            </button>  
        </ion-list>
    </ion-content>
  `
})


export class CategoryComponent {
    private categories: Array<string>;

    constructor(public navCtrl: NavController, public events: Events,
        @Inject(LookupService) public lookupService: ILookupService, ) {        
        this.getCategoryData();
    }

    itemSelected(value: any) {
        this.events.publish('category:selected', value);
        this.navCtrl.pop();
    }

    getCategoryData() {
        this.lookupService.getCategories().subscribe((response) => {
            if (response) {
                this.categories = response
            }
        });
    }
}