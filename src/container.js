import { StockRepository } from './stocks/infrastructure/stock.repository.js'
import {getStocksUsecaseFactory} from './stocks/domain/get-stocks.usecase.js'
import {updateStockUsecaseFactory} from './stocks/domain/update-stock.usecase.js'
import {updateStockAndSendEventUsecaseFactory} from './stocks/domain/updateStockAndSendEvent.js'

const stockRepository = new StockRepository()
const updateStock = updateStockUsecaseFactory(stockRepository)
const updateStockAndSendEvent = updateStockAndSendEventUsecaseFactory(stockRepository)
const getStocks = getStocksUsecaseFactory(stockRepository)


export default {
    UpdateStock: updateStock,
    UpdateStockAndSendEvent: updateStockAndSendEvent,
    GetStocks: getStocks,
}
