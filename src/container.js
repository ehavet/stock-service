import { StockRepository } from './stocks/infrastructure/stock.repository.js'
import {getStocksUsecaseFactory} from './stocks/domain/get-stocks.usecase.js'
import {updateStockUsecaseFactory} from './stocks/domain/update-stock.usecase.js'
import {updateStockAndSendEventUsecaseFactory} from './stocks/domain/update-stock-and-send-event.usecase.js'
import broker from './kafka.js'
const messageProducer = broker.producer
const stockRepository = new StockRepository()
const updateStock = updateStockUsecaseFactory(stockRepository)
const updateStockAndSendEvent = updateStockAndSendEventUsecaseFactory(stockRepository, messageProducer)
const getStocks = getStocksUsecaseFactory(stockRepository)


export default {
    UpdateStock: updateStock,
    UpdateStockAndSendEvent: updateStockAndSendEvent,
    GetStocks: getStocks,
}
