import { Component, OnInit, ElementRef } from '@angular/core';
import { NavController, MenuController, ViewController, NavParams } from 'ionic-angular';
import {IFilters} from '../../app/models/filters';

@Component({
    selector: 'filters-page',
    templateUrl: 'filters.html',
    providers: []
})

export class FiltersPage implements OnInit {
    private selectedCategory: string;
    private filters : IFilters;
    private rootPage : this;
    
    constructor(public viewCtrl: ViewController,
     public navCtrl: NavController,   public menu: MenuController,
     public navParams: NavParams) {
        this.selectedCategory = navParams.get('category');
       
    }

    ngOnInit() {
        this.filters = <IFilters>{};
    }

    clearFilters() {
        this.filters = <IFilters>{};
    }
}
