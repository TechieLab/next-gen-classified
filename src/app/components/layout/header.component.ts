import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import { NotificationPage } from '../../../pages/notification/notification.page';
import { SearchPage } from '../../../pages/search/search.page';
import { VendorService } from '../../services/vendor.service';
import { CategoryComponent } from '../category';

@Component({
    selector: 'header-component',
    templateUrl: 'header.html',
    entryComponents: [CategoryComponent],
    providers: [VendorService],
})

export class HeaderComponent {
    private categories: Array<string>;
    private selectedCategory: string;
    private ads: Array<any>;
    private items: Array<any>;
    private city: String; 

    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public service: VendorService) {
        this.selectedCategory = 'Select Category';
        //this.category = new CategoryComponent();

    }

    ngOnInit() {
        Geolocation.getCurrentPosition().then((resp) => {
            this.service.getCity(resp).subscribe((res: any) => {
                this.city = JSON.parse(res._body)['results']['0']['address_components']['4']['long_name'];
            });
        }).catch((error) => {
            console.log('Error getting Location', error)
        });       
    }

    gotoNotificationPage() {
        this.navCtrl.push(NotificationPage, {
            id: "123",
            name: "Carl"
        });
    }

    gotoSearchPage() {
        this.navCtrl.setRoot(SearchPage, { category: 'POST FOR FREE' });
    }

    onSelectCategory() {
        this.navCtrl.push(CategoryComponent);
    }

    onUpdateCategory(item) {
        debugger;
        this.selectedCategory = item;
        this.navCtrl.pop();
    }
}