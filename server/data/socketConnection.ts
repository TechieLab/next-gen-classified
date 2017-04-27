var io = require('socket.io');
var clients = [];

import { Message } from '../models/message';

export class SocketConnection {
    public static setup(server) {
        io = io.listen(server);

        io.on('connection', (socket) => {
            console.log('The user is connected');
            clients.push(socket);
            
            socket.on('join', function (data) {
                console.log('The user is join');
                console.log(data);
                socket.join(data.UserId); // We are using room of socket io
            });

            socket.on('new_msg-sent', (message: Message) => {
                console.log(message);
                socket.emit('message-received', message);
            });

            socket.on('disconnect', function () {
                var index = clients.indexOf(socket);
                if (index != -1) {
                    clients.splice(index, 1);
                    console.info('Client gone (id=' + socket.id + ').');
                }
            });
        });

        io.sockets.in('user1@example.com').emit('new_msg', { msg: 'hello' });
    }
}
