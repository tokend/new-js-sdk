import { createAtomicSwapBid } from '../scripts/create_atomic_swap_bid'
import { soldAtomicSwapBid } from '../scripts/sold_atomic_swap_bid'
import { createAssetFromScratch } from '../scripts/create_asset'
import { atomicSwapBidHelper } from '../helpers'
import { NotFoundError } from '../../src/errors'

describe('Atomic swap', () => {
  it('should create atomic swap bid and sold it', async () => {
    const { assetCode, ownerKp } = await createAssetFromScratch({policies: 32})
    let { bid } = await createAtomicSwapBid({ baseAsset: assetCode }, ownerKp)

    await soldAtomicSwapBid({ bidID: bid.id }, ownerKp)

    try {
        await atomicSwapBidHelper.tryLoadById(bid.id)
    } catch (e) {
      expect(e).to.be.instanceOf(NotFoundError)
    }
  })
})
