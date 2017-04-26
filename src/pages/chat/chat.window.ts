// import { Http } from "@angular/http";
// import { NgZone, Component } from "@angular/core";
// import * as io from 'socket.io-client';

// @Component({
//     selector: 'chat-page',
//     templateUrl: 'chat.html',
// })

// export class ChatPage {
//     messages: Array<any>;
//     socketHost: string;
//     zone: NgZone;
//     chatBox: string;
//     socket: any;

//     constructor(http: Http) {
//         this.messages = [];
//         this.socketHost = "http://localhost:3000";
//         this.zone = new NgZone({ enableLongStackTrace: false });
//         http.get(this.socketHost + "/api/chats").subscribe((success) => {
//             var data = success.json();
//             for (var i = 0; i < data.length; i++) {
//                 this.messages.push(data[i].message);
//             }
//         }, (error) => {
//             console.log(JSON.stringify(error));
//         });
//         this.chatBox = "";
//         this.socket = io(this.socketHost);
//         this.socket.on("chat_message", (msg) => {
//             this.zone.run(() => {
//                 this.messages.push(msg);
//             });
//         });
//     }

//     send(message) {
//         if (message && message != "") {
//             this.socket.emit("chat_message", message);
//         }
//         this.chatBox = "";
//     }
// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { ChatService } from './chat.service';
import { Message } from '../../app/models/message';

@Component({
    selector: 'app-chat-window',
    templateUrl: './chat.window.html',
    //styles: require('./chat.scss'),
    providers: [ChatService]
})

export class ChatWindow implements OnInit, OnDestroy {
    messages: Array<Message>;
    connection: any;
    message: string;
    receiverId: string;
    isChatInitiated: boolean;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public chatService: ChatService) {

        this.isChatInitiated = false;
        this.message = 'Say hello!';
        this.messages = new Array<Message>();
        // this.messages.push(<Message>{});
        this.receiverId = navParams.get('receiverId');
    }

    sendMessage() {
        if (!this.isChatInitiated) {
            this.chatService.joinChat();
        }
        this.chatService.sendMessage(this.message, this.receiverId);

        this.message = '';
    }

    ngOnInit() {
        this.connection = this.chatService.getMessages().subscribe(data => {
            this.messages = data;
        });
    }

    // Let's unsubscribe our Observable
    ngOnDestroy() {
        this.connection.unsubscribe();
    }
}