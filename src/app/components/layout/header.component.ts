import { Component, Inject } from '@angular/core';
import { NavController, Events, ModalController, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import { NotificationPage } from '../../../pages/notification/notification.page';
import { SearchPage } from '../../../pages/search/search.page';
import { VendorService } from '../../services/vendor.service';
import { CategoryComponent } from '../category';
import { MyFavtPostingPage } from '../../../pages/myFavourite/myFavt.page';
import { AuthGuard, IAuthGuard } from '../../services/guard.service';
import { AccountService, IAccountService } from '../../../pages/account/account.service';
import { IPostService, PostService } from '../../../pages/post/post.service';

@Component({
    selector: 'header-component',
    templateUrl: 'header.html',
    entryComponents: [CategoryComponent, SearchPage],
    providers: [VendorService,AuthGuard,AccountService]
})

export class HeaderComponent {
    private categories: Array<string>;
    private selectedCategory: string;
    private ads: Array<any>;
    private items: Array<any>;
    private city: String;
    private isUserAuthenticated: boolean = false;
    private FavouritePostCount:number;
    private updatedCount:number;

    constructor(public navCtrl: NavController,
        public modalCtrl: ModalController,
        public navParams: NavParams,
        public events: Events,
        @Inject(PostService) public postService: IPostService,
        @Inject(AuthGuard) public authGuard: IAuthGuard,
        @Inject(AccountService) public accountService: IAccountService,
        public service: VendorService) {
        this.selectedCategory = 'Select Category';
        //this.category = new CategoryComponent();
    }

    ngOnInit() {
        this.getFavouritePostsCount();
        this.isUserAuthenticated = this.authGuard.canActivate();

        this.events.subscribe('favtpost:count', (res) => {

            this.FavouritePostCount = res.post.length; 
        });

    }  

    getFavouritePostsCount(){
         this.postService.getFavorite().subscribe((response) => {
            this.FavouritePostCount = response.length;
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

     gotoFavouritePage() {
       this.navCtrl.push(MyFavtPostingPage); 
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