import { Component, OnInit, ElementRef } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
    selector: 'filters-page',
    templateUrl: 'filters.html',
    providers: []
})

export class FiltersPage implements OnInit {
    private selectedCategory: string;
    private criteria : any;
    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
        this.selectedCategory = navParams.get('category');
        this.criteria = {};
    }

    ngOnInit() {

    }

    dismiss() {
        let data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    }

}
