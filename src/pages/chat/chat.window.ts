import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, ViewController, NavParams, ToastController, Events } from 'ionic-angular';
import { ChatService } from './chat.service';
import { Message } from '../../app/models/message';
import { StorageService } from '../../app/services/storage.service';

@Component({
    selector: 'app-chat-window',
    templateUrl: './chat.window.html',
    // styleUrls: ['./chat.scss'],
    providers: [ChatService]
})

export class ChatWindow implements OnInit, OnDestroy {
    messages: Array<Message>;
    connection: any;
    message: string;
    receiverId: string;
    roomId: string
    isChatInitiated: boolean;
    userId: string;
    private curtrentUser: any;

    constructor(public navCtrl: NavController, public events: Events,
        public navParams: NavParams, public viewCtrl: ViewController,
        public chatService: ChatService) {

        this.isChatInitiated = false;
        this.messages = new Array<Message>();
        // this.messages.push(<Message>{});      
        this.receiverId = viewCtrl.getNavParams().get('receiverId');
        this.roomId = viewCtrl.getNavParams().get('Room');
    }

    ngOnInit() {
        //this.getMessages();

        this.createRoomAndJoin();

        // this.events.subscribe('message_created', (data) => {  
        //    this.messages.push(data.Content);
        // });

        this.updateChat();
    }

    getMessages() {
        this.userId = StorageService.getItem('Client_Id');
        this.connection = this.chatService.getById(this.userId).subscribe(data => {
            if (data) {
                this.messages = data.Messages;
            }
        });
    }

    onKeyDown(event) {
        if (event.keyCode == 13) {
            this.sendMessage();
        }
    }

    createRoomAndJoin() {
        if (this.roomId) {
            this.chatService.joinRoom(this.roomId);
        } else {
            this.chatService.createRoom(this.receiverId);
        }
    }

    updateChat() {
        this.connection = this.chatService.updateChat().subscribe((data) => {
            if (data) {          
                data.TimeStamp = data.ReceivedOn ? data.ReceivedOn : data.SentOn;
                this.messages.push(data);
            }
        });
    }

    sendMessage() {
        this.chatService.sendMessage(this.roomId, this.message, this.receiverId);
        this.message = '';
    }

    cancelChat() {
        this.viewCtrl.dismiss();
    }

    // Let's unsubscribe our Observable
    ngOnDestroy() {
        this.connection.unsubscribe();
    }
}