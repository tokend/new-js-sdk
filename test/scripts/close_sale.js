import { createFundedGeneral } from './create_account'
import { createSaleOffer } from './create_sale_offer'
import { saleHelper } from '../helpers'
import { logger } from '../logger'

export async function closeSale (saleId, ownerKp) {
  const log = logger.new('closeSale')

  let sale = await saleHelper.mustLoadById(saleId)
  // TODO: create multiple accounts and invest in multiple assets
  const assetToInvestIn = sale.quoteAssets.quoteAssets[0] // because of reasons
  const amountToCloseSale = String(sale.hardCap * assetToInvestIn.price)

  const { accountKp } = await createFundedGeneral({
    [assetToInvestIn.asset]: amountToCloseSale
  })
  log.info(`Investor created and funded`)

  const ruleID = await saleHelper.createSaleRule({
    saleID: sale.id, accountID: accountKp.accountId()
  }, ownerKp)
  log.info(`Sale rule successfully created with id #${ruleID}`)

  try {
    await createSaleOffer({
      saleId: sale.id,
      amount: amountToCloseSale,
      quoteAsset: assetToInvestIn.asset
    }, accountKp)
    log.info(`Invested is sale #${sale.id}, now the hard cap should be reached`)
  } catch (e) {
    log.error(e)
  }

  try {
    await saleHelper.checkSaleState(sale.id)
    log.info(`Checked sale state, looking for results`)
  } catch (e) {
    log.error(e)
  }

  return saleHelper.mustLoadClosed(saleId)
}
