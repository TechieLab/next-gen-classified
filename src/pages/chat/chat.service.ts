import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {Message} from '../../app/models/message';
import {StorageService} from '../../app/services/storage.service';

export class ChatService {
    // Our localhost address that we set in our server code
    private url = 'http://localhost:3000';
    private socket;
    private message : Message;

    constructor(){
        
    }

    sendMessage(text: string, receiverId : string) {
        this.message = new Message();
        this.message.Content = text;
        this.message.FromUserId = StorageService.getItem('Client_Id');
        this.message.ToUserId = receiverId;
        // Make sure the "add-message" is written here because this is referenced in on() in our server
        this.socket.emit('add-message', this.message);
    }

    getMessages() {
        let observable = new Observable<Array<Message>>(observer => {
            this.socket = io(this.url);
            this.socket.on('message', (data : Array<Message>) => {
                observer.next(data);
            });
            return (data : Array<Message>) => {
                this.socket.disconnect();
            };
        });
        return observable;
    }
}