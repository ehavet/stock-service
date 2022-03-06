export default function (container) {
    return async ({message}) => {
        const {event, payload} = parseMessage(message)
    }
}

const parseMessage = (message) => {
    const event = message.key.toString()
    const valueObject = JSON.parse(message.value.toString())
    const payload = {
        orderId: parseInt(valueObject.orderId),
        itemId: valueObject.itemId,
        quantity: parseInt(valueObject.quantity)
    }
    console.log({key: event, value: payload})
    return {event, payload}
}
