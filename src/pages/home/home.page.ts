import { Component, OnInit, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import {NotificationPage} from '../notification/notification.page';
import {CatalogPage} from '../catalog/catalog.page';
import {ProductPage} from '../product/product.page';
import {PostNewAd}   from '../postnewad/postnewad.page';
import {SearchPage}  from '../search/search.page';
import {VendorService} from '../../app/services/vendor.service';


@Component({
    selector: 'home-page',
    templateUrl: 'home.html',
    providers:[VendorService],
    entryComponents: []
})

export class HomePage implements OnInit {
    private categories: Array<string>;
    private selectedCategory: string;
    private ads: Array<any>;
    private category: boolean;
    private items: Array<any>;
    private city:String;
   

    constructor(public navCtrl: NavController, public navParams: NavParams,public service:VendorService) {
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
       Geolocation.getCurrentPosition().then((resp) => {
          this.service.getCity(resp).subscribe((res:any) =>{
              this.city = JSON.parse(res._body)['results']['0']['address_components']['4']['long_name'];
          });
       }).catch((error) => {
           console.log('Error getting Location',error)
       })    
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

    gotoPostingAdPage(){
        this.navCtrl.push(PostNewAd, { category : 'POST FOR FREE' });
    }

    gotoSearchPage(){
       this.navCtrl.push(SearchPage, { category : 'POST FOR FREE' });
    }
}