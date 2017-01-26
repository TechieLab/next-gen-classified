import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home.page';
import { SignInPage } from '../pages/login/login.page';
import { SettingsPage } from '../pages/settings/settings.page';
import { NotificationPage } from '../pages/notification/notification.page';
import { CatalogPage } from '../pages/catalog/catalog.page';
import { ProductPage } from '../pages/product/product.page';
import { Welcome } from '../pages/welcome/welcome.page';
import { PostNewAd } from '../pages/postnewad/postnewad.page';
import {SearchPage}   from '../pages/search/search.page';

@Component({
  templateUrl: 'app.html',
  entryComponents: [Welcome, PostNewAd,
    HomePage,
    SignInPage,
    SettingsPage,
    NotificationPage,
    CatalogPage,
    ProductPage,
    SearchPage]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = Welcome;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Post Ad', component: PostNewAd },
      { title: 'Favourites', component: SettingsPage },
      { title: 'About', component: HomePage },
      { title: 'Settings', component: SettingsPage },
      { title: 'Feedback', component: SettingsPage },
      { title: 'Support', component: HomePage },
      { title: 'Help', component: SettingsPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
