import { Component, OnInit, Output, Inject } from '@angular/core';
import { Events, NavController, ViewController } from 'ionic-angular';
import { ILookupService, LookupService } from '../services/lookup.service';
import { Lookup } from '../models/lookup';

@Component({
    selector: 'category-components',
    template: ` 
     <ion-content> 
        <ion-list>
            <button ion-item *ngFor="let item of categories" (click)="itemSelected(item)">
                {{ item.Name }}
                <ion-icon end *ngIf="item._id == selectedCategory" name="checkmark"></ion-icon>
            </button>              
        </ion-list>
    </ion-content>
  `
})

export class CategoryComponent implements OnInit {
    private categories: Array<Lookup>;
    private selectedCategory: Lookup;

    constructor(public navCtrl: NavController,
        public viewCtrl: ViewController,
        public events: Events,
        @Inject(LookupService) public lookupService: ILookupService, ) {
        this.selectedCategory = new Lookup();
        this.selectedCategory._id = viewCtrl.getNavParams().get('selectedCategory');
    }

    ngOnInit() {
        this.getCategoryData();
        this.events.subscribe('close:category', () => {
            this.viewCtrl.dismiss();
        });
    }

    itemSelected(value: Lookup) {
        this.viewCtrl.dismiss(value);
    }

    getCategoryData() {
        this.lookupService.getCategories().subscribe((response) => {
            if (response) {
                this.categories = response;
            }
        });
    }
}