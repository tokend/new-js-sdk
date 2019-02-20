import { SALE_STATES } from '../../src/const'
import { closeSale } from '../scripts/close_sale'
import { createAssetFromScratch } from '../scripts/create_asset'
import { createSale } from '../scripts/create_sale'

describe('Sale', () => {
  it('should create the fixed price sale and close it by reaching the hard cap', async () => {
    const { assetCode, ownerKp } = await createAssetFromScratch()
    let { sale } = await createSale({ baseAsset: assetCode }, ownerKp)
    sale = await closeSale(sale.id)

    expect(sale.state.value).to.equal(SALE_STATES.closed)
  })
})
