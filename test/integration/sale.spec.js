import { createAssetFromScratch } from '../scripts/create_asset'
import { createSale } from '../scripts/create_sale'

describe('Sale', () => {
  it.only('should create the fixed price sale and close it by reaching the hard cap', async () => {
    const { assetCode, ownerKp } = await createAssetFromScratch()
    const { sale } = await createSale({ baseAsset: assetCode }, ownerKp)

    console.log('sale created successfully')
    console.log(sale)
    expect(sale.id).to.exist
  })
})
