import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController,ModalController, NavParams, ToastController, Events } from 'ionic-angular';
import { ChatService } from './chat.service';
import { Message } from '../../app/models/message';
import { Chat } from '../../app/models/chat';
import {ChatWindow} from './chat.window';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.html',
    //styles: require('./chat.scss'),
    providers: [ChatService]
})

export class ChatPage implements OnInit, OnDestroy {
    chats: Array<Chat>;

    constructor(public navCtrl: NavController,
        public navParams: NavParams, public modalCtrl: ModalController,
        public chatService: ChatService) {

    }

    ngOnInit() {
        this.getChatHistory();
    }

    getChatHistory() {
        this.chatService.get().subscribe((res) => {
            this.chats = res;
        });
    }

    openChatWindow() {
        let modal = this.modalCtrl.create(ChatWindow, { enableBackdropDismiss: true });
        modal.onDidDismiss(data => {
            
        });
        modal.present();
    }

    // Let's unsubscribe our Observable
    ngOnDestroy() {

    }
}