import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {HomePage} from '../pages/home/home.page';
import {LoginPage} from '../pages/login/login.page';
import {SignInPage} from '../pages/login/login.page';
import {SettingsPage} from '../pages/settings/settings.page';
import {DashboardPage} from '../pages/dashboard/dashboard.page';
import {NotificationPage} from '../pages/notification/notification.page';
@Component({
  templateUrl: 'app.html',
   entryComponents: [HomePage, SignInPage, LoginPage,SettingsPage, DashboardPage, NotificationPage]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = DashboardPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage },    
      { title: 'Settings', component: SettingsPage }
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
