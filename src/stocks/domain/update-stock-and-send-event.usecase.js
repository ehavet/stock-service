export function updateStockAndSendEventUsecaseFactory(stockRepository, producer) {
    return async (orderId, clientId, id, quantity) => {
        const stock = await stockRepository.get(id)
        if (!stock) return console.log(`Could not find stock id : ${id}`)
        if (stock.units < quantity) return console.log(`Insufficient stock : ${id}`)
        await stockRepository.update(id, stock.units - quantity)
        console.log('Stock has been updated')
        await producer.send({
            topic: 'stock',
            messages: [
                {key: 'updated', value: `{"orderId": "${orderId}", "clientId": "${clientId}", "itemId": "${id}", "quantity": "${quantity}"}`}
            ]
        })
        return console.log('Stock Updated message as been published')
    }
}
