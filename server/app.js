const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const initDatabase = require('./startUp/initDatabase')
const path = require('path')
const routes = require('./routes')
const cors = require('cors');

const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,
    optionSuccessStatus:200
}

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors(corsOptions));
app.use('/api', routes)

const PORT = config.get('port') ?? 8080

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client')))
    const indexPath = path.join(__dirname, 'client', 'index.html')
    app.get('*', (req, res) => {
        res.sendFile(indexPath)
    })
}

async function start() {
    try {
        mongoose.connection.once('open', () => {
            initDatabase()
        })
        await mongoose.connect(config.get('mongoUri'))
        app.listen(PORT, () =>
            console.log(chalk.green(`Server has been started on port ${PORT}`)))
    } catch (e) {
        console.log(chalk.red(e.message))
        process.exit(1)
    }

}

start()