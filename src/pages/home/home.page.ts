import { Component, OnInit, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import {CatalogPage} from '../catalog/catalog.page';
import {ProductPage} from '../product/product.page';
import {PostNewAdPage}   from '../postnewad/postnewad.page';



@Component({
    selector: 'home-page',
    templateUrl: 'home.html',
    entryComponents: []
})

export class HomePage implements OnInit {
    private categories: Array<string>;
    private selectedCategory: string;
    private ads: Array<any>;
    private category: boolean;
    private items: Array<any>;
    private city:String;
   

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.category = true;
        this.selectedCategory = navParams.get('category'); 
        this.categories = ["Mobile", "Electronics", "Home", "Entertainment", "Pet Care", "Education"];        

        this.items = [{}, {}];
    }

    ngOnInit() {
         
    }

    getItems() {
          
    }    

    gotoCatalogPage(cat : string){
        this.navCtrl.push(CatalogPage, { category : cat });
    }  

    gotoPostingAdPage(){
        this.navCtrl.push(PostNewAdPage, { category : 'POST FOR FREE' });
    }  
}