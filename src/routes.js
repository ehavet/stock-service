import express from 'express'
const router = express.Router()
import container from './container.js'
import stocksEndpoints from './stocks/api/v0/stocks.api.js'

export default stocksEndpoints(router, container)
