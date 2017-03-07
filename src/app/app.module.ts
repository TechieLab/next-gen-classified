import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JsonpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {OrderBy} from '../app/pipes/orderBy';
import { Constants } from './common/constants';
import { AppModules } from './common/moduleConstants';
import { AppProviders } from './common/providerConstants';

import { AppComponents, featuredComponents, customPipes } from './common/componentConstants';

@NgModule({
  declarations: [
    MyApp,
    AppComponents
  ],
  imports: [
    FormsModule,
    CommonModule,
    JsonpModule,

    AppModules,

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
    featuredComponents
  ],
  providers: [
    AppProviders,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
