import { createFundedGeneral } from './create_account'
import { createSaleOffer, createSaleOfferRequest } from './create_sale_offer'
import { saleHelper } from '../helpers'
import { logger } from '../logger'
import config from '../config'

export async function closeSale (saleId, ownerKp, withBlacklist) {
  const log = logger.new('closeSale')

  let sale = await saleHelper.mustLoadById(saleId)
  // TODO: create multiple accounts and invest in multiple assets
  const assetToInvestIn = sale.quoteAssets.quoteAssets[0] // because of reasons
  const amountToCloseSale = String(sale.hardCap / 2 * assetToInvestIn.price)

  const { accountKp: accountKp0 } = await createFundedGeneral({
    [assetToInvestIn.asset]: amountToCloseSale
  })
  log.info(`Investor created and funded`)

  const { accountKp: accountKp1 } = await createFundedGeneral({
    [assetToInvestIn.asset]: amountToCloseSale
  })
  log.info(`Investor created and funded`)

  const { accountKp: accountKp2 } = await createFundedGeneral({
    [assetToInvestIn.asset]: amountToCloseSale
  })
  log.info(`Investor created and funded`)

  if (config.use_sale_rules) {
    const ruleID0 = await saleHelper.createSaleRule({
      saleID: sale.id, accountID: accountKp0.accountId(), forbids: true
    }, ownerKp)
    log.info(`Sale rule successfully created with id #${ruleID0}`)

    const ruleID1 = await saleHelper.createSaleRule({
      saleID: sale.id, accountID: accountKp1.accountId()
    }, ownerKp)
    log.info(`Sale rule successfully created with id #${ruleID1}`)

    const ruleID2 = await saleHelper.createSaleRule({
      saleID: sale.id, accountID: accountKp2.accountId()
    }, ownerKp)
    log.info(`Sale rule successfully created with id #${ruleID2}`)

    await saleHelper.removeRule({
      ruleID: ruleID2
    }, ownerKp)
    log.info(`Sale rule successfully removed with id #${ruleID2}`)

    const ruleID3 = await saleHelper.createSaleRule({
      saleID: sale.id, accountID: accountKp2.accountId()
    }, ownerKp)
    log.info(`Sale rule successfully created with id #${ruleID3}`)
  }

  await createSaleOffer({
    saleId: sale.id,
    amount: amountToCloseSale,
    quoteAsset: assetToInvestIn.asset
  }, accountKp1)
  log.info(`Invested is sale #${sale.id}`)

  await createSaleOffer({
    saleId: sale.id,
    amount: amountToCloseSale,
    quoteAsset: assetToInvestIn.asset
  }, accountKp2)
  log.info(`Invested is sale #${sale.id}, now the hard cap should be reached`)

  await saleHelper.checkSaleState(sale.id)
  log.info(`Checked sale state, looking for results`)

  return saleHelper.mustLoadClosed(saleId)
}

export async function closeSaleWithRequest(saleId, ownerKp) {
  const log = logger.new('closeSale')

  let sale = await saleHelper.mustLoadById(saleId)
  // TODO: create multiple accounts and invest in multiple assets
  const assetToInvestIn = sale.quoteAssets.quoteAssets[0] // because of reasons
  const amountToCloseSale = String(sale.hardCap * assetToInvestIn.price)

  const { accountKp: accountKp1 } = await createFundedGeneral({
    [assetToInvestIn.asset]: amountToCloseSale
  })
  log.info(`Investor created and funded`)

  await createSaleOfferRequest({
    saleId: sale.id,
    amount: amountToCloseSale,
    quoteAsset: assetToInvestIn.asset,
    allTasks: 0
  }, accountKp1)
  log.info(`Invested is sale #${sale.id}`)

  await saleHelper.checkSaleState(sale.id)
  log.info(`Checked sale state, looking for results`)

  return saleHelper.mustLoadClosed(saleId)
}
