export function removeFromStockAndSendEventUsecaseFactory(stockRepository, producer) {
    return async (orderId, clientId, id, quantity) => {

        await producer.send({
            topic: 'stock',
            messages: [
                {key: 'eventName', value: `{"orderId": "${orderId}", "clientId": "${clientId}", "itemId": "${id}", "quantity": "${quantity}"}`}
            ]
        })
    }
}
