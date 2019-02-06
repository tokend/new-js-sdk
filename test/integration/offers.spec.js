import { createAndPopulateOrderBook } from '../scripts/populate_order_book'

describe.only('Offers', () => {
  it('should create few offers', async () => {
    await createAndPopulateOrderBook()
  })
 })
