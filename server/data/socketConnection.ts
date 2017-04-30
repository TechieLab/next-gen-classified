var io = require('socket.io');
var clients = [], rooms = [];

import {ChatRepository} from '../repository/chatRepository';
import {ChatService} from '../services/chatService';

import { Message } from '../models/message';
import {Chat} from '../models/chat';

export class SocketConnection {

    
    public static setup(server) {
        io = io.listen(server);

        var repository = new ChatRepository();
        var service = new ChatService(repository);

        io.on('connection', function (socket) {
            //Globals            
            var rooms = [];
           
            socket.on('createroom', function (data) {
                var new_room = ("" + Math.random()).substring(2, 7);
                rooms.push(new_room);
                data.Room = new_room;
                //socket.emit('updatechat', new_room);
                socket.emit('roomcreated', data);
            });

            //Listens for new user
            socket.on('new_user', function (data) {
              
                //New user joins the default room
                socket.join(data.Room);
                //Tell all those in the room that a new user joined
                socket.broadcast.emit('user_joined', data);
            });

            //Listens for switch room
            socket.on('switch_room', (data) => {
                //Handles joining and leaving rooms
                //console.log(data);
                socket.leave(data.oldRoom);
                socket.join(data.newRoom);
                io.in(data.oldRoom).emit('user_left', data);
                io.in(data.newRoom).emit('user_joined', data);
            });

            //Listens for a new chat message
            socket.on('new_message', (data) => {
                //Create message
                var chat = new Chat();
                chat.Messages.push(data);

                console.log(data);
                
                // service.update(chat, (err, res) => {

                // });
                //Save it to database
                //newMsg.save(function (err, msg) {
                    //Send message to those connected in the room
                    io.sockets.in(data.Room).emit('message_created', data);
                //});
            });
        });
    }
}
