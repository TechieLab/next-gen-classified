import { Component, Output, Inject, OnInit } from '@angular/core';
import { Events, ViewController } from 'ionic-angular';
import { ILookupService, LookupService } from '../services/lookup.service';
import {Constants} from '../common/constants';

@Component({
    selector: 'sort-component',
    template: `     
     <ion-content> 
        <ion-list>
            <ion-item *ngFor="let item of sortByList" (click)="itemSelected(item)">
                 {{ item.Name }}
                <ion-icon item-right large *ngIf="item.Value == selectedSortBy.Value && item.Order == selectedSortBy.Order" name="checkmark"></ion-icon>
            </ion-item>  
        </ion-list>        
    </ion-content>
  `
})


export class SortComponent implements OnInit {
    private sortByList: Array<any>;
    private selectedSortBy :any;


    constructor(public viewCtrl: ViewController, public events: Events) {
        this.selectedSortBy = {
            Value : viewCtrl.getNavParams().get('sortByValue'),
            Order : viewCtrl.getNavParams().get('sortByOrder')
        };
    }

    ngOnInit() {
        this.sortByList = Constants.SortBy
    }

    itemSelected(value: any) {
        this.viewCtrl.dismiss(value);
    }
}