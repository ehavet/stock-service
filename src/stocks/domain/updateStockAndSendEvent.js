export function updateStockAndSendEventUsecaseFactory(stockRepository) {
    return async (orderId, id, quantity) => {
        const stock = await stockRepository.get(id)
        if (!stock) return console.log(`Could not find stock id : ${id}`)
        if (stock.units < quantity) return console.log(`Insufficient stock : ${id}`)
        await stockRepository.update(id, stock.units - quantity)
        return console.log('Stock has been updated')
    }
}