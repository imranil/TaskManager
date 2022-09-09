
const users = new Map()

class Socket {
    constructor(socket) {
        this.socket = socket

        this.disconnect = this.disconnect.bind(this)
    }

    setUser() {
        
    }    

    disconnect() {
        this.socket.on('disconnect', function () {
            console.log('A user disconnected');
        });
    }
}