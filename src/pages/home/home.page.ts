import { Component, Inject, OnInit, ElementRef } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import {  Events , NavController, NavParams, ToastController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import { CatalogPage } from '../catalog/catalog.page';
import { ProductPage } from '../product/product.page';
import { PostNewAdPage } from '../post/postnewad.page';
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
    private latestPosts: Array<Post>;
    private city: String;


    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
        @Inject(PostService) public postService: IPostService,
        public toastCtrl : ToastController) {
        this.category = true;
        this.selectedCategory = '';

        this.events.subscribe('category:selected', (res) => {
            this.selectedCategory = res.name;
            this.getLatestPostList();
        });
    }

    ngOnInit() {
        this.getLatestPostList();

        this.events.subscribe('user:changePassword', (res) => {
             this.presentToast('password changed Successfully');
        });
    }

    getLatestPostList() {
        var params;
        if (this.selectedCategory.toLowerCase()) {
            params = new URLSearchParams();
            params.set('Category', this.selectedCategory.toLowerCase());
        }
        this.postService.getAllByQuery(params).subscribe((response) => {
            this.latestPosts = response;
        });
    }

    gotoCatalogPage(cat: string) {
        this.navCtrl.push(CatalogPage, { category: cat });
    }

    gotoPostingAdPage() {
        this.navCtrl.push(PostNewAdPage, { category: 'POST FOR FREE' });
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