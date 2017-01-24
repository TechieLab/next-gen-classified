import { NgModule, ErrorHandler } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HomeModule} from '../pages/home/home.module';
import {HomePage} from '../pages/home/home.page';
import {LoginPage} from '../pages/login/login.page';
import {SignInPage} from '../pages/login/login.page';
import {Welcome} from '../pages/welcome/welcome.page';
import {SettingsPage} from '../pages/settings/settings.page';
import {DashboardPage} from '../pages/dashboard/dashboard.page';
import {NotificationPage} from '../pages/notification/notification.page';
import {CatalogPage} from '../pages/catalog/catalog.page';

@NgModule({
  declarations: [
    MyApp, Welcome,
    HomePage,
    LoginPage,
    SignInPage,
    SettingsPage,
     DashboardPage,
      NotificationPage,
      CatalogPage
  ],
  imports: [  FormsModule,  CommonModule ,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
