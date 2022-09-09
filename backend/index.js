const express = require('express')
const fileUpload = require('express-fileupload')
const http = require('http')
const socketio = require('socket.io')
const config = require('config')
const authRouter = require('./routes/auth.routes')
const taskRouter = require('./routes/task.routes')
const inviteRouter = require('./routes/invite.routes')
const corsMiddleware = require('./middleware/cors.middleware')

const PORT = config.get('serverPort')
const app = express()
const httpServer = http.createServer(app)
const io = socketio(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
})


app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json())
app.use(express.static('static'))
app.use('/api/auth', authRouter)
app.use('/api/tasks', taskRouter)
app.use('/api/invites', inviteRouter)

const start = async () => {
    try {

        httpServer.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        })

        io.on('connect', async function (socket) {
            console.log('A user connected');

            socket.on('user', function(data) {
                console.log(socket.id)
                console.log('Я получил личное сообщение от ', data.email)
            })
        
            socket.on('disconnect', function () {
                console.log('A user disconnected');
            });
        });

    } catch (e) {
        console.log(e)
    }
}

start()