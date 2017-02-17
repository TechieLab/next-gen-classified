import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JsonpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Constants } from './common/constants';
import { AppModules } from './common/moduleConstants';
import { AppProviders } from './common/providerConstants';

import { AppComponents, featuredComponents } from './common/componentConstants';

@NgModule({
  declarations: [
    MyApp,
    AppComponents
  ],
  imports: [
    FormsModule,
    CommonModule,
    JsonpModule,
    ReactiveFormsModule,

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
