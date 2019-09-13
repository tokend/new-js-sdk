import { SALE_STATES } from '../../src/const'
import { closeSaleWithRequest } from '../scripts/close_sale'
import { createAssetFromScratch } from '../scripts/create_asset'
import { createSale } from '../scripts/create_sale'
import { xdr } from '../../src/base';
import { SALE_TYPES } from '../../src/const/enums.const'

describe('Immediate Sale', () => {
  it('should create the fixed price sale and close it by reaching the hard cap', async () => {
    const { assetCode, ownerKp } = await createAssetFromScratch()
    let { sale } = await createSale({ baseAsset: assetCode, saleEnumType: SALE_TYPES.immediate }, ownerKp)
    sale = await closeSaleWithRequest(sale.id, ownerKp)

    expect(sale.state.value).to.equal(SALE_STATES.closed)
  })
})
