
const users = new Map()

class Socket {
    constructor(socket) {
        this.socket = socket

        this.disconnect = this.disconnect.bind(this)
    }

    setUser() {
        users.set(this.socket.id, data)
        console.log('User set. id:', socket.id)
    }    

    disconnect() {
        this.socket.on('disconnect', function () {
            console.log('A user disconnected');
        });
    }
}

module.exports = Socket;