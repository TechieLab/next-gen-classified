import { Component, Inject, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import {
    Events,
    NavController,
    NavParams,
    ToastController,
    LoadingController,
    ModalController
} from 'ionic-angular';

import { Geolocation } from 'ionic-native';
import { SortComponent } from '../../app/components/sort.component';
import { CatalogPage } from '../catalog/catalog.page';
import { ProductPage } from '../product/product.page';
import { AddEditPostPage } from '../post/addEditPost.page';
import { IPostService, PostService } from '../post/post.service';
import { Post } from '../../app/models/post';

@Component({
    selector: 'home-page',
    templateUrl: 'home.html',
    entryComponents: [SortComponent]
})

export class HomePage implements OnInit {  
    private selectedCategoryId: string;
    private category: boolean;  
    private latestPosts: Array<Post>;    
    private viewType: string;
    private sortBy: Object;
    private pageSize: number = 25;
    private pageNumber: number = 1;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        private loadingCtrl: LoadingController,
        @Inject(PostService) public postService: IPostService, ) {
        this.category = true;
        this.selectedCategoryId = '';
        this.viewType = 'list';
    }

    ngOnInit() {
        this.events.subscribe('category:selected', (res) => {
            this.selectedCategoryId = res._id;
            this.getLatestPostList();
        });

        this.events.subscribe('user:changePassword', (res) => {
            this.presentToast('password changed Successfully');
        });

        this.events.subscribe('sortBy:selected', (res) => {
            this.getLatestPostList()
        });

        this.postService.getLogged().subscribe((logged: boolean) => {
            console.log('Welcome %s', logged);
        });
    }

    ionViewWillEnter() { // THERE IT IS!!!
        this.getLatestPostList();
    }

    getLatestPostList() {

        let loader = this.loadingCtrl.create({
            content: "Loading Posts..."
        });

        loader.present();

        this.getPostData().then((data) => {
            this.latestPosts = data;
            loader.dismiss();
        });
    }

    getPostData(): Promise<any> {
        var params = new URLSearchParams();;

        if (this.selectedCategoryId) {
            params.set('Category', this.selectedCategoryId);
        }

        if (this.sortBy) {
            params.set('sortKey', this.sortBy['value']);
            params.set('sortOrder', this.sortBy['order']);
        }

        if (this.pageSize) {
            params.set('pageSize', this.pageSize.toString());
        }

        if (this.pageNumber) {
            params.set('page', this.pageNumber.toString());
        }

        return new Promise(resolve => {
            this.postService.getAllByQuery(params).subscribe((res) => {              
                resolve(res);
            });
        });
    }

    doInfinite(infiniteScroll) {     
        // increase pagenumber to get next set of records.  
        this.pageNumber += 1;

        setTimeout(() => {
            this.getPostData().then((data) => {
                if (data.length == this.latestPosts.length) {
                    infiniteScroll.enable(false); 
                }
                this.latestPosts = data;
                infiniteScroll.complete();                
            });
        }, 500);
    }

    switchView(viewType: string) {
        if (viewType == 'list') {
            this.viewType = 'grid';
        } else {
            this.viewType = 'list';
        }

        this.getLatestPostList();
    }

    openSortingMenu() {
        let modal = this.modalCtrl.create(SortComponent, { sortBy: this.sortBy }, { enableBackdropDismiss: true });
        modal.onDidDismiss(data => {
            this.sortBy = data;
            this.getLatestPostList();
        });
        modal.present();
    }

    gotoCatalogPage(cat: string) {
        this.navCtrl.push(CatalogPage, { category: cat });
    }

    gotoPostingAdPage() {
        this.navCtrl.push(AddEditPostPage, { category: 'POST FOR FREE' });
    }

    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }
}