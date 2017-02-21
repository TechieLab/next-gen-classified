import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { AppComponents, featuredComponents, pages } from './common/componentConstants';
import { Welcome } from '../pages/welcome/welcome.page';
import { ProfilePage } from '../pages/profile/profile.page';
import { LoginPage } from '../pages/account/login.page';
import {HomePage} from '../pages/home/home.page';
import { AuthGuard,IAuthGuard } from '../app/services/guard.service';


@Component({
  templateUrl: 'app.html',
  entryComponents: [AppComponents, featuredComponents,LoginPage,HomePage],
  providers:[AuthGuard]
})
export class MyApp implements OnInit{
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<{ title: string, component: any, name: any }>;
  private isUserAuthenticated: boolean = false;

  constructor(
    public platform: Platform,
    public menu: MenuController,
     @Inject(AuthGuard) public authGuard: IAuthGuard

  ) {
    this.initializeApp();

    // set our app's pages
   this.pages = pages;

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

  ngOnInit() { // THERE IT IS!!!
        var isLoggedin =  this.authGuard.canActivate();
        if(isLoggedin){
          // make HelloIonicPage the root (or first) page
          this.rootPage = HomePage;
        }else{
          this.rootPage = Welcome;
       }
    }
}
