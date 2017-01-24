import { Component, OnInit, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {NotificationPage} from '../notification/notification.page';
import {CatalogPage} from '../catalog/catalog.page';
import {ProductPage} from '../product/product.page';

@Component({
    selector: 'dashboard-page',
    templateUrl: 'dashboard.html',
    entryComponents: []
})

export class DashboardPage implements OnInit {

    private categories: Array<string>;
    private selectedCategory: string;
    private ads: Array<any>;
    private category: boolean;
    private items: Array<any>;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.category = true;
        this.selectedCategory = navParams.get('category'); 
        this.categories = ["Mobile", "Electronics", "Home", "Entertainment", "Pet Care", "Education"];
        this.ads = [{
            MainImage: '',
            Title: 'Sample',
            Price: '200'
        }, {
            MainImage: '',
            Title: 'Sample 2',
            Price: '200'
        }, {
            MainImage: '',
            Title: 'Sample 345',
            Price: '200'
        }, {
            MainImage: '',
            Title: 'Sample 453',
            Price: '200'
        }];

        this.items = [{}, {}];
    }

    ngOnInit() {

    }

    getItems() {

    }

    gotoNotificationPage() {
        this.navCtrl.push(NotificationPage, {
            id: "123",
            name: "Carl"
        });

    }

    gotoCatalogPage(cat : string){
          this.navCtrl.push(CatalogPage, { category : cat });
    }

    showProductDetails(item : string){
        this.navCtrl.push(ProductPage, { category : item });
    }
}