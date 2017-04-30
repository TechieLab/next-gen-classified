import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Message } from '../../app/models/message';
import { Chat } from '../../app/models/chat';
import { Constants } from '../../app/common/constants';

import { StorageService } from '../../app/services/storage.service';
import { IBaseService, BaseService } from '../../app/services/base.service';
export interface IChatService extends IBaseService<Chat> {
    sendMessage(room, text: string, receiverId: string);  
    createRoom(guestUserId);
    joinRoom(data);
    updateChat();
    userAdded();
}
@Injectable()
export class ChatService extends BaseService<Chat> implements IChatService {
    // Our localhost address that we set in our server code
    private host = Constants.BaseApi;
    private socket: SocketIOClient.Socket;
    private message: Message;
    private socketData : any;

    constructor(http: Http, public events: Events) {
        super(http, "chats");

        this.socket = io(this.host);

        this.socket.on('connect', () => { });

        this.socket.on('roomcreated', (data) => {
            this.socket.emit('new_user', data);
        });

        this.socket.on('user_joined', (data) => {
            this.socketData = data;
            this.events.publish('user_joined', data);
        });

        this.socket.on('message_created', (data) => {
           this.events.publish('message_created', data);
        });
    }

    createRoom(guestUserId) {
        this.socket.emit('createroom', { UserId: StorageService.getItem('Client_Id'), GuestUserId: guestUserId });
    }

    joinRoom(data) {
        this.socket.emit('new_user', { Room: data, UserId: StorageService.getItem('Client_Id') });
    }

    sendMessage(room: string, text: string, receiverId: string) {

        if(this.socketData){
            room = this.socketData.Room;
        }

        this.message = new Message();
        this.message.Content = text;
        this.message.Room = room;
        this.message.FromUserId = StorageService.getItem('Client_Id');
        this.message.ToUserId = receiverId;
        // Make sure the "add-message" is written here because this is referenced in on() in our server
        this.socket.emit('new_message', this.message);
        //this.socket.send(StorageService.getItem('Client_Id')).emit('new_msg-sent', this.message);
    }

    updateChat() {
        let observable = new Observable<Message>(observer => {
            this.socket.on('message_created', (data) => {
                observer.next(data);
            });
        });

        return observable;
    }

    userAdded() {
        let observable = new Observable<any>(observer => {
            this.socket.on('user_joined', (data) => {
                observer.next(data);
            });
        });

        return observable;
    }
}