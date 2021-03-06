import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JsonpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler, Platform } from 'ionic-angular';

import { MyApp } from './app.component';
import { Constants } from './common/constants';
import { AppModules } from './common/moduleConstants';
import { AppProviders } from './common/providerConstants';
import { Components } from './common/componentConstants';
import { Directives } from './common/directiveConstants';
import { Pages } from './common/pageConstants';
import { Pipes } from './common/pipeConstants';

@NgModule({
  declarations: [
    Directives,
    Components,
    Pages,
    MyApp,
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
    MyApp, Components
  ],
  providers: [    
    AppProviders,     
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
