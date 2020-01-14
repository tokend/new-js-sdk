import { createAndPopulateOrderBook } from '../scripts/populate_order_book'
import { createAndPopulateOrderBookWithRequests } from '../scripts/populate_order_book_requests'

describe('Offers', () => {
  it('should create few offers', async () => {
    await createAndPopulateOrderBook()
  })
  it('should create few offers thru requests', async () => {
    await createAndPopulateOrderBookWithRequests()
  })
 })
