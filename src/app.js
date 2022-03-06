import express from 'express'
import kafka from './kafka.js'
const app = express()
import boom from 'express-boom'
import config from './config.js'
import {messagesHandler, routes} from './interfaces.js'
import logger from 'express-pino-logger'
import cors from 'cors'

const consume = async () => {
    const consumer = kafka.consumer({
        groupId: 'order-service-consumer'
    })
    await consumer.connect()
    await consumer.subscribe({topic: 'order'})
    await consumer.run({eachMessage: messagesHandler})
}

function listen () {
    app.use(cors())
    app.use(logger())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(boom())
    app.use(routes)
    app.use(function(req,res){
        res.boom.notFound(`Could not find resource ${req.path}`)
    })

    app.listen(config.get('APP_PORT'), () => {
        console.log(`Express server listening on http://localhost:${config.get('APP_PORT')}`)
    })
}

function init() {
    consume().catch(console.error)
    listen()
}

init()
