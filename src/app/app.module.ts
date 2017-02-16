import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JsonpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Constants } from './common/constants';
import { myModules} from './common/moduleConstants';
import { myComponents, featuredComponents} from './common/componentConstants';


import { ILookupService, LookupService } from './services/lookup.service';
import { IPostService, PostService } from './services/post.service';
import { IProductService, ProductService } from './services/product.service';

@NgModule({
  declarations: [
       MyApp, 
    ...myComponents
  ],
  imports: [
       FormsModule, 
       CommonModule,
       JsonpModule,
       ReactiveFormsModule,
    ...myModules,
    
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
       MyApp,
    ...featuredComponents
  ],
  providers: [
    { provide: LookupService, useClass: LookupService },
   // { provide: AccountService, useClass: AccountService },
    { provide: PostService, useClass: PostService },
    { provide: ProductService, useClass: ProductService },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
