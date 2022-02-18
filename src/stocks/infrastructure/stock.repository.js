const stocks = [
    {id: '1', units: 231},
    {id: '2', units: 644 },
    {id: '3', units: 89 },
    {id: '4', units: 964 },
    {id: '5', units: 142 },
    {id: '6', units: 354 }]

export class StockRepository {
    async get() {
        return stocks
    }

    async update(id, units) {
        const index = stocks.findIndex((stock => stock.id === id))
        stocks[index].units = units
    }
}
