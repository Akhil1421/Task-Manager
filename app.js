const express = require('express')
const app = express()
const tasks = require('./routes/routes.js')
const {connectDb} = require('./db/connect')
const {errorHandler} = require('./routes/functionWrapper')
require('dotenv').config()

app.use(express.static('./public'))
app.use(express.json())
app.use('/api/v1/tasks', tasks)
app.use(errorHandler)
const port = process.env.PORT || 5000 ;
const start = async ()=>{
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port, 
            console.log('Listening at port 5000...')
        )
    } catch (error) {
        console.log(error);
    }
}
start()

