export class StockNotFoundError extends Error {
    constructor (candyId) {
        const message = `Could not find candy with id : ${candyId}`
        super(message)
        this.name = 'StockNotFoundError'
    }
}
