import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Message } from '../../app/models/message';
import { Chat } from '../../app/models/chat';

import { StorageService } from '../../app/services/storage.service';
import { IBaseService, BaseService } from '../../app/services/base.service';
export interface IChatService extends IBaseService<Chat> {
    sendMessage(text: string, receiverId: string);
    getMessages();
}
@Injectable()
export class ChatService extends BaseService<Chat> implements IChatService {
    // Our localhost address that we set in our server code
    private host = 'http://localhost:3000';
    private socket: SocketIOClient.Socket;
    private message: Message;

    constructor(http: Http) {
        super(http, "chats");      
    }

    joinChat() {
        this.socket = io(this.host);
        this.socket.emit('join', { UserId: StorageService.getItem('Client_Id') });
    }

    sendMessage(text: string, receiverId: string) {
        this.message = new Message();
        this.message.Content = text;
        this.message.FromUserId = StorageService.getItem('Client_Id');
        this.message.ToUserId = receiverId;
        // Make sure the "add-message" is written here because this is referenced in on() in our server
        this.socket.emit('new_msg-sent', this.message);
        //this.socket.send(StorageService.getItem('Client_Id')).emit('new_msg-sent', this.message);
    }

    getMessages() {
        let observable = new Observable<Array<Message>>(observer => {

            this.socket.on('message-received', (data: Array<Message>) => {
                observer.next(data);
            });
            // });
            // return (data : Array<Message>) => {
            //     this.socket.disconnect();
            // };
        });
        return observable;
    }
}