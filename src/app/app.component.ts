import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { Events, Platform, MenuController, Nav } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { OrderBy } from '../app/pipes/orderBy';

import { Components } from './common/componentConstants';
import { appPages, authPages, Pages } from './common/pageConstants';
import { WelcomePage } from '../pages/welcome/welcome.page';
import { NotificationPage } from '../pages/notification/notification.page';
import { ProfilePage } from '../pages/profile/profile.page';
import { LoginPage } from '../pages/account/login.page';
import { SearchPage } from '../pages/search/search.page';
import { HomePage } from '../pages/home/home.page';
import { MyPostingsPage } from '../pages/myPostings/myPostings.page';
import { MyFavtPostingPage } from '../pages/myFavourite/myFavt.page';
import { AuthGuard, IAuthGuard } from '../app/services/guard.service';
import { AccountService, IAccountService } from '../pages/account/account.service';
import { StorageService } from '../app/services/storage.service';
import { ProfileService, IProfileService } from '../pages/profile/profile.service';
import { Profile } from '../app/models/profile';

@Component({
  templateUrl: 'app.html',
  entryComponents: [
    Components,
    Pages,
    LoginPage,
    SearchPage
  ],
  providers: [AuthGuard]
})

export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<{ title: string, component: any, name: any, seq: number }>;
  private isUserAuthenticated: boolean = false;
  private currentUserName: string;
  private profile: Profile

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public events: Events,
    @Inject(AuthGuard) public authGuard: IAuthGuard,
    @Inject(AccountService) public accountService: IAccountService,
    @Inject(ProfileService) public profileService: IProfileService
  ) {

    this.initializeApp();

    // set our app's pages
    this.pages = appPages;

    this.profile = new Profile();

    this.getUserContext();
    this.getProfile();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  gotoLoginPage() {
    this.menu.close();
    this.nav.push(LoginPage);
  }

  gotoProfilePage() {
    this.menu.close();
    this.nav.push(ProfilePage);
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page

    if (page.title == 'Home') {
      this.nav.setRoot(page.component);
    } else {
      this.nav.push(page.component);
    }
  }

  getUserContext() {
    this.isUserAuthenticated = false;
  }

  getProfile() {
    let clientId = StorageService.getItem('Client_Id')
    this.profileService.getById(clientId).subscribe((result) => {
      if (result) {
        this.profile = result;
      }
    });
  }

  logoff() {
    this.accountService.logout().subscribe((res) => {
      StorageService.removeToken();
      this.menu.close();
      this.rootPage = LoginPage;
      this.isUserAuthenticated = false;
      this.pages = appPages;
    });
  }

  ngOnInit() { // THERE IT IS!!!  debugger;
    this.isUserAuthenticated = this.authGuard.canActivate();
    this.currentUserName = StorageService.getItem('User_Name');

    if (this.isUserAuthenticated) {
      this.rootPage = HomePage;
      this.pages = this.pages.concat(authPages);
    } else {
      this.rootPage = WelcomePage;
    }

    this.events.subscribe('user:login', (res) => {
      this.isUserAuthenticated = this.authGuard.canActivate();
      this.currentUserName = StorageService.getItem('User_Name');

      if (this.isUserAuthenticated) {
        this.pages = this.pages.concat(authPages);
      }
    });
  }
}
