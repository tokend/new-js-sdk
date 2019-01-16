import {
  sdk,
  balanceHelper,
  saleHelper,
  offerHelper
} from '../helpers'
import { logger } from '../logger'

/**
 * @param {object} opts
 * @param {string} opts.saleId
 * @param {string} opts.quoteAsset
 * @param {string} opts.amount
 * @param {Keypair} signerKp
 * @returns {Promise<void>}
 */
export async function createSaleOffer (opts, signerKp) {
  const sale = await saleHelper.mustLoadById(opts.saleId)
  const price = sale
    .quoteAssets
    .quoteAssets
    .find(asset => asset.asset === opts.quoteAsset)
    .price

  return createOffer({
    baseAsset: sale.baseAsset,
    quoteAsset: opts.quoteAsset,
    orderBookID: sale.id,
    amount: opts.amount,
    isBuy: true,
    price
  }, signerKp)
}

/**
 * @param opts - see {@link Offer.create}
 * @param opts.baseAsset
 * @param opts.quoteAsset
 * @param {Keypair} signerKp
 */
export async function createOffer (opts, signerKp) {
  const { data: account } = await sdk.horizon.account.get(signerKp.accountId())

  const [baseBalance, quoteBalance] = await Promise.all([
    ensureAndGetBalanceId(account, opts.baseAsset),
    ensureAndGetBalanceId(account, opts.quoteAsset)
  ])

  console.log('baseBalance, quoteBalance:')
  console.log(baseBalance, quoteBalance)

  await offerHelper.create({
    fee: '0.000000', // TODO: load from horizon,
    baseBalance,
    quoteBalance,
    ...opts
  }, signerKp)
}

export async function ensureAndGetBalanceId (account, assetCode) {
  const log = logger.new('ensureAndGetBalanceId')

  const balance = balanceHelper.getMostFundedBalance(account, assetCode)
  if (balance) {
    return balance.balanceId
  }

  log.info(`Account ${account.id} has no ${assetCode} balance, now creating one`)
  await balanceHelper.create(account.id, assetCode)
  log.info('Balance created, retrying check')

  // Querying `/balances` to ensure balances ingested:
  const newBalance = await balanceHelper.mustLoad(account.id, assetCode)
  console.log('newBalance')
  console.log(newBalance)
  return newBalance.balanceId
}
