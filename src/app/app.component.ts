import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HeaderComponent } from './components/layout/header.component';
import { HomePage } from '../pages/home/home.page';
import { AdminPage } from '../pages/admin/admin.page';
import { LoginPage } from '../pages/account/login.page';
import { RegisterPage } from '../pages/account/register.page';
import { ProfilePage } from '../pages/profile/profile.page';
import { SettingsPage } from '../pages/settings/settings.page';
import { NotificationPage } from '../pages/notification/notification.page';
import { CatalogPage } from '../pages/catalog/catalog.page';
import { ProductPage } from '../pages/product/product.page';
import { MyPostingsPage } from '../pages/myPostings/myPostings.page';
import { Welcome } from '../pages/welcome/welcome.page';
import { PostNewAdPage } from '../pages/postnewad/postnewad.page';
import { SearchPage } from '../pages/search/search.page';
import { FeedbackPage } from '../pages/feedback/feedback.page';
import { HelpPage } from '../pages/help/help.page';
import { Rating } from './components/rating';
import { CategoryComponent } from './components/category';

@Component({
  templateUrl: 'app.html',
  entryComponents: [Welcome, PostNewAdPage,
    HomePage,ProfilePage,LoginPage,RegisterPage,
    SettingsPage,
    NotificationPage,
    CatalogPage,
    ProductPage,MyPostingsPage,
    SearchPage, FeedbackPage, HelpPage, Rating, HeaderComponent, CategoryComponent]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = Welcome;
  pages: Array<{ title: string, component: any, name: any }>;
  private isUserAuthenticated: boolean = false;

  constructor(
    public platform: Platform,
    public menu: MenuController

  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage, name: "home" },
      { title: 'Admin', component: AdminPage, name: "person" },
      { title: 'My Postings', component: MyPostingsPage, name: "paper" },
      { title: 'Favourites', component: SettingsPage, name: "star" },
      { title: 'About', component: HomePage, name: "book" },
      { title: 'Settings', component: SettingsPage, name: "settings" },
      { title: 'Feedback', component: FeedbackPage, name: "paper" },
      { title: 'Help', component: HelpPage, name: "help-circle" }
    ];

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
}
