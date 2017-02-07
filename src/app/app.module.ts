import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HeaderComponent } from './components/layout/header.component';
import { HomePage } from '../pages/home/home.page';
import { LoginPage } from '../pages/account/login.page';
import { RegisterPage } from '../pages/account/register.page';
import { ProfilePage } from '../pages/profile/profile.page';
import { Welcome } from '../pages/welcome/welcome.page';
import { SettingsPage } from '../pages/settings/settings.page';
import { NotificationPage } from '../pages/notification/notification.page';
import { CatalogPage } from '../pages/catalog/catalog.page';
import { ProductPage } from '../pages/product/product.page';
import { MyPostingsPage } from '../pages/myPostings/myPostings.page';
import { PostNewAdPage } from '../pages/postnewad/postnewad.page';
import { Constants } from './common/constants';
import { SearchPage } from '../pages/search/search.page';
import { FiltersPage } from '../pages/filters/filters.page';
import { FeedbackPage } from '../pages/feedback/feedback.page';
import { HelpPage } from '../pages/help/help.page';
import { Rating } from './components/rating';
import { CategoryComponent } from './components/category';

import { ILookupService, LookupService } from './services/lookup.service';
import { IPostService, PostService } from './services/post.service';

@NgModule({
  declarations: [
    MyApp, Welcome,
    HomePage,
    PostNewAdPage,
    LoginPage, RegisterPage, ProfilePage,
    SettingsPage,
    NotificationPage,
    CatalogPage, ProductPage,MyPostingsPage,
    SearchPage, FiltersPage, FeedbackPage, HelpPage, Rating, HeaderComponent, CategoryComponent
  ],
  imports: [FormsModule, CommonModule,
    IonicModule.forRoot(MyApp, {
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios'
    }, {})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, FiltersPage, FeedbackPage, HelpPage, CategoryComponent
  ],
  providers: [
    { provide: LookupService, useClass: LookupService },
    { provide: PostService, useClass: PostService },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
