import { Component, Output, Inject, OnInit } from '@angular/core';
import { Events, ViewController } from 'ionic-angular';
import { ILookupService, LookupService } from '../services/lookup.service';

@Component({
    selector: 'sort-component',
    template: `     
     <ion-content> 
        <ion-list>
            <button ion-item *ngFor="let item of sortByList" (click)="itemSelected(item)">
                {{ item.name }}
            </button>  
        </ion-list>
    </ion-content>
  `
})


export class SortComponent implements OnInit {
    private sortByList: Array<any>;

    constructor(public viewCtrl: ViewController, public events: Events) {

    }

    ngOnInit() {
        this.sortByList = [{
            name: 'High Price',
            value: 'Price',
            order: -1,
        }, {
            name: 'Low Price',
            value: 'Price',
            order: 1
        }, {
            name: 'Recent Post',
            value: 'ModifiedOn',
            order: -1,
        }, {
            name: 'Old Post',
            value: 'ModifiedOn',
            order: 1,
        }, {
            name: 'Discount',
            value: 'Discount',
            order: -1,
        }]
    }

    itemSelected(value: any) {
        this.viewCtrl.dismiss(value);
    }
}