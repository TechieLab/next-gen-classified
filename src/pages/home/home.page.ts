import { Component, Inject, OnInit, ElementRef } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { Events, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import { CatalogPage } from '../catalog/catalog.page';
import { ProductPage } from '../product/product.page';
import { AddEditPostPage } from '../post/addEditPost.page';
import { IPostService, PostService } from '../post/post.service';

import { Post } from '../../app/models/post';

@Component({
    selector: 'home-page',
    templateUrl: 'home.html',
    entryComponents: []
})

export class HomePage implements OnInit {
    private categories: Array<string>;
    private selectedCategory: string;
    private category: boolean;
    private featuredPosts: Array<Post>;
    private latestPosts: Observable<Array<Post>>;
    private city: string;
    private viewType: string;


    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public toastCtrl: ToastController,
        private loadingCtrl: LoadingController,
        @Inject(PostService) public postService: IPostService, ) {
        this.category = true;
        this.selectedCategory = '';
        this.viewType = 'list';
    }

    ngOnInit() {
        this.getLatestPostList();

        this.events.subscribe('category:selected', (res) => {
            this.selectedCategory = res.name;
            this.getLatestPostList();
        });

        this.events.subscribe('user:changePassword', (res) => {
            this.presentToast('password changed Successfully');
        });

        this.events.subscribe('remove:favouritePost', (res) => {
            debugger;
            this.getLatestPostList();
        });
    }

    getLatestPostList() {
        var params;
        if (this.selectedCategory.toLowerCase()) {
            params = new URLSearchParams();
            params.set('Category', this.selectedCategory.toLowerCase());
        }
        let loader = this.loadingCtrl.create({
            content: "Loading Posts..."
        });
        loader.present();

        this.latestPosts = this.postService.getAllByQuery(params);

        this.latestPosts.subscribe(() => {
            loader.dismiss();
        });
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