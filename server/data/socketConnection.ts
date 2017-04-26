var io = require('socket.io');
import {Message} from '../models/message';

export class SocketConnection {
    public static setup(server) {
        io = io.listen(server);

        io.on('connection', (socket) => {
            console.log('The user is connected');

            socket.on('disconnect', function () {
                console.log('The user is disconnected');
            });

            socket.on('join', function (data) {
                console.log('The user is join');
                console.log(data);
                socket.join(data.userId); // We are using room of socket io
            });

            socket.on('new_msg-sent', (message: Message) => {
                console.log(message);
                io.emit('message-received', message);
            });
        });

        io.sockets.in('user1@example.com').emit('new_msg', { msg: 'hello' });
    }
}
