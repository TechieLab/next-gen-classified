import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { Events, Platform, MenuController, Nav } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { OrderBy } from '../app/pipes/orderBy';

import { AppComponents, featuredComponents, appPages, authPages } from './common/componentConstants';
import { Welcome } from '../pages/welcome/welcome.page';
import { ProfilePage } from '../pages/profile/profile.page';
import { LoginPage } from '../pages/account/login.page';
import { SearchPage } from '../pages/search/search.page';
import { HomePage } from '../pages/home/home.page';
import { AuthGuard, IAuthGuard } from '../app/services/guard.service';
import { AccountService, IAccountService } from '../pages/account/account.service';
import { StorageService } from '../app/services/storage.service';

@Component({
  templateUrl: 'app.html',
  entryComponents: [AppComponents, featuredComponents, LoginPage, HomePage, SearchPage],
  providers: [AuthGuard]
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<{ title: string, component: any, name: any, seq: number }>;
  private isUserAuthenticated: boolean = false;
  private currentUserName: string;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public events: Events,
    @Inject(AuthGuard) public authGuard: IAuthGuard,
    @Inject(AccountService) public accountService: IAccountService

  ) {

    this.initializeApp();

    // set our app's pages
    this.pages = appPages;

    this.getUserContext();
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
      this.rootPage = Welcome;
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
