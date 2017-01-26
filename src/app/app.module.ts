import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomeModule } from '../pages/home/home.module';
import { HomePage } from '../pages/home/home.page';
import { SignInPage } from '../pages/login/login.page';
import { Welcome } from '../pages/welcome/welcome.page';
import { SettingsPage } from '../pages/settings/settings.page';
import { DashboardPage } from '../pages/dashboard/dashboard.page';
import { NotificationPage } from '../pages/notification/notification.page';
import { CatalogPage } from '../pages/catalog/catalog.page';
import { ProductPage } from '../pages/product/product.page';
import { PostNewAd } from '../pages/postnewad/postnewad.page';
import { Constants } from './common/constants';
import { SearchPage } from '../pages/search/search.page';
import { FiltersPage } from '../pages/filters/filters.page';

@NgModule({
  declarations: [
    MyApp, Welcome,
    HomePage,
    PostNewAd,
    SignInPage,
    SettingsPage,
    DashboardPage,
    NotificationPage,
    CatalogPage, ProductPage,
    SearchPage, FiltersPage
  ],
  imports: [FormsModule, CommonModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, FiltersPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
