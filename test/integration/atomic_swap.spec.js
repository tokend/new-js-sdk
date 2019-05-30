import { createAtomicSwapAsk } from '../scripts/create_atomic_swap_ask'
import { soldAtomicSwapAsk } from '../scripts/sold_atomic_swap_ask'
import { createAssetFromScratch } from '../scripts/create_asset'
import { atomicSwapAskHelper } from '../helpers'
import { NotFoundError } from '../../src/errors'

describe('Atomic swap', () => {
  it('should create atomic swap bid and sold it', async () => {
    const { assetCode, ownerKp } = await createAssetFromScratch({policies: 32})
    let { ask } = await createAtomicSwapAsk({ baseAsset: assetCode }, ownerKp)

    await soldAtomicSwapAsk({ askID: ask.id }, ownerKp)

    try {
        await atomicSwapAskHelper.tryLoadById(ask.id)
    } catch (e) {
      expect(e).to.be.instanceOf(NotFoundError)
    }
  })
})
