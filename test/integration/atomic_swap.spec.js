import { createAtomicSwapBid } from '../scripts/create_atomic_swap_bid'
import { soldAtomicSwapBid } from '../scripts/sold_atomic_swap_bid'
import { createAssetFromScratch } from '../scripts/create_asset'

describe('Atomic swap', () => {
  it('should create atomic swap bid and sold it', async () => {
    const { assetCode, ownerKp } = await createAssetFromScratch({policies: 32})
    let { bid } = await createAtomicSwapBid({ baseAsset: assetCode }, ownerKp)
    bid = await soldAtomicSwapBid(bid.id)

    expect(sale.state.value).to.equal(SALE_STATES.closed)
  })
})
