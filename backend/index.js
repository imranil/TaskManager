const express = require('express')
const config = require('config')
const authRouter = require('./routes/auth.routes')
const taskRouter = require('./routes/task.routes')
const corsMiddleware = require('./middleware/cors.middleware')

const PORT = config.get('serverPort')
const app = express()

app.use(corsMiddleware)
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/tasks', taskRouter)

const start = async () => {
    try {

        app.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        })

    } catch(e) {
        console.log(e)
    }
}

start()