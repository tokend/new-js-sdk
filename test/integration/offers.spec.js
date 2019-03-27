import { createAndPopulateOrderBook } from '../scripts/populate_order_book'

describe.skip('Offers', () => {
  it('should create few offers', async () => {
    await createAndPopulateOrderBook()
  })
 })
