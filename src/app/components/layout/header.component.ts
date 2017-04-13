import { Component, Inject } from '@angular/core';
import { NavController, Events, ModalController, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import { NotificationPage } from '../../../pages/notification/notification.page';
import { SearchPage } from '../../../pages/search/search.page';
import { ExternalService } from '../../services/external.service';
import { CategoryComponent } from '../category.component';
import { MyFavtPostingPage } from '../../../pages/myFavourite/myFavt.page';
import { AuthGuard, IAuthGuard } from '../../services/guard.service';
import { AccountService, IAccountService } from '../../../pages/account/account.service';
import { IPostService, PostService } from '../../../pages/post/post.service';
import { Lookup } from '../../models/lookup';
@Component({
    selector: 'header-component',
    templateUrl: 'header.html',
    entryComponents: [CategoryComponent, SearchPage, NotificationPage],
    providers: [ExternalService, AuthGuard, AccountService]
})

export class HeaderComponent {
    private categories: Array<string>;
    private selectedCategory: Lookup;
    private ads: Array<any>;
    private items: Array<any>;
    private city: String;
    private isUserAuthenticated: boolean = false;
    private FavouritePostCount: number;
    private updatedCount: number;

    constructor(public navCtrl: NavController,
        public modalCtrl: ModalController,
        public navParams: NavParams,
        public events: Events,
        @Inject(PostService) public postService: IPostService,
        @Inject(AuthGuard) public authGuard: IAuthGuard,
        @Inject(AccountService) public accountService: IAccountService) {
        this.selectedCategory = new Lookup();
        this.selectedCategory.Name = 'Select Category';
    }

    ngOnInit() {
        this.getFavouritePostsCount();
        this.isUserAuthenticated = this.authGuard.canActivate();
        this.events.subscribe('favtpost:count', (res) => {
            this.FavouritePostCount = res.post.length;
        });
    }

    getFavouritePostsCount() {
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
        this.events.publish('close:category');
        let modal = this.modalCtrl.create(CategoryComponent, { selectedCategory: this.selectedCategory._id }, { enableBackdropDismiss: true });
        modal.onDidDismiss(data => {
            this.selectedCategory = data;
            this.events.publish('category:selected', data);
        });
        modal.present();
    }

    onUpdateCategory(item) {
        debugger;
        this.selectedCategory = item;
        this.navCtrl.pop();
    }
}