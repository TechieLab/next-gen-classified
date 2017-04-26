import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import {ChatService} from './chat.service';
import {ChatPage} from './chat.page';
import {ChatWindow} from './chat.window';

@NgModule({
    declarations:[ChatPage, ChatWindow],    
    exports:[ChatPage],
    imports:[IonicModule],
    providers:[ChatService],
    entryComponents: [ChatPage, ChatWindow]
})

export class ChatModule{}