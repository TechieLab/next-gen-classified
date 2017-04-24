import { Component, OnInit, Output, Inject } from '@angular/core';
import { Events, NavController, ViewController } from 'ionic-angular';
import { ILookupService, LookupService } from '../services/lookup.service';
import { Lookup } from '../models/lookup';

@Component({
    selector: 'category-component',
    template: ` 
     <ion-content> 
        <ion-list>
            <ion-item  *ngFor="let item of categories" (click)="itemSelected(item)">
                 {{ item.Name }}
                <ion-icon item-right large *ngIf="item._id == selectedCategory._id" name="checkmark"></ion-icon>
            </ion-item>                     
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
        this.categories = new Array<Lookup>();
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
                this.categories[0] = new Lookup();
                this.categories = this.categories.concat(response);
            }
        });
    }
}