import { Component, Inject, OnInit, ElementRef } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import { CatalogPage } from '../catalog/catalog.page';
import { ProductPage } from '../product/product.page';
import { PostNewAdPage } from '../postnewad/postnewad.page';
import { IPostService, PostService } from '../../app/services/post.service';

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


    constructor(public navCtrl: NavController, public navParams: NavParams,
        @Inject(PostService) public postService: IPostService) {
        this.category = true;
        this.selectedCategory = navParams.get('category');
    }

    ngOnInit() {
        this.getFeaturedPostList();
        this.getLatestPostList();
    }

    getFeaturedPostList() {
        var params = new URLSearchParams();
        params.set('IsFeatured', 'true');
        this.postService.getByQuery(params).subscribe((response) => {
            this.featuredPosts = response;
        });
    }

    getLatestPostList() { 
        this.postService.get().subscribe((response) => {
            this.latestPosts = response;
        });
    }

    gotoCatalogPage(cat: string) {
        this.navCtrl.push(CatalogPage, { category: cat });
    }

    gotoPostingAdPage() {
        this.navCtrl.push(PostNewAdPage, { category: 'POST FOR FREE' });
    }
}