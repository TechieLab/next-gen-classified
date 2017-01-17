import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HomeModule} from '../pages/home/home.module';
import {HomePage} from '../pages/home/home.page';
import {SettingsPage} from '../pages/settings/settings.page';
@NgModule({
  declarations: [
    MyApp, HomePage, SettingsPage
  ],
  imports: [    
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
