export function updateStockUsecaseFactory (stockRepository) {
    return async (id, units) => {
        return await stockRepository.update(id, units)
    }
}
