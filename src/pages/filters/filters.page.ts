import { Component, OnInit, ElementRef } from '@angular/core';
import { NavController, MenuController, ViewController, NavParams } from 'ionic-angular';

@Component({
    selector: 'filters-page',
    templateUrl: 'filters.html',
    providers: []
})

export class FiltersPage implements OnInit {
    private selectedCategory: string;
    private criteria : any;
    private rootPage : this;
    
    constructor(public viewCtrl: ViewController,
     public navCtrl: NavController,   public menu: MenuController,
     public navParams: NavParams) {
        this.selectedCategory = navParams.get('category');
        this.criteria = {};
    }

    ngOnInit() {

    }

    close() {
       this.navCtrl.pop();    }
}
