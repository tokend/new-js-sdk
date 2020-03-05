import { createAndPopulateOrderBook } from '../scripts/populate_order_book'
import { createAndPopulateOrderBookWithRequests } from '../scripts/populate_order_book_requests'
import {createOfferWithSmallBigQuoteValue} from "../scripts/offer_with_small_big_quote";

describe('Offers', () => {
  it('should create few offers', async () => {
    await createAndPopulateOrderBook()
  })
  it('should create few offers thru requests', async () => {
    await createAndPopulateOrderBookWithRequests()
  })
  it('should create random offers', async () => {
    await createOfferWithSmallBigQuoteValue()
  })
 })
