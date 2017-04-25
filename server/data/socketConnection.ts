var io = require('socket.io');

export class SocketConnection {    
    public static setup(server){
        io = io.listen(server);

        io.on('connection', (socket) => {
            console.log('The user is connected');

            socket.on('disconnect', function () {
                console.log('The user is disconnected');
            });
            
            socket.on('add-message', (message) => {

                io.emit('message', { type: 'new-message', text: message });
            });
        });
    }
}
