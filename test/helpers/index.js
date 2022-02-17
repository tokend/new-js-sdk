import config from '../config'

import { ApiCaller, TokenD, base, Wallet } from '../../src'

import { Account } from './account'
import { Signer } from './signer'
import { AmlAlert } from './aml-alert'
import { Asset } from './asset'
import { AssetPair } from './asset_pair'
import { Balance } from './balance'
import { Issuance } from './issuance'
import { KeyValue } from './key_value'
import { Offer } from './offer'
import { Request } from './request'
import { Sale } from './sale'
import { Withdraw } from './withdraw'
import { Payment } from './payment'
import { StampHelper } from './stamp'
import { LicenseHelper } from './license'
import { AtomicSwapAsk } from './atomic_swap_ask'
import { AtomicSwapBid } from './atomic_swap_bid'
import { Poll } from './poll'
import { Swap } from './swap'
import { Vote } from './vote'
import { ManageAccountRole } from './manage_account_role'
import { ChangeRole } from './change_role'
import { KYCRecoveryHelper } from './kyc_recovery'
import { Redemption } from './redemption'
import { Data } from './data'
import { CsvParser } from './csv_parser'
import { DeferredPayment } from './deferred_payment'
import { LiquidityPoolHelper } from './lp_add_liquidity'

export const masterKP = base.Keypair.fromSecret(config.master_seed)
const masterWallet = new Wallet('foo@bar.baz', masterKP, masterKP.accountId(), 'fooWalletID', 'fooSessID', 'fooSessKey')

export const sdk = new TokenD(config.api_url, {
  allowHttp: config.allow_http
})
sdk._useNetworkPassphrase(config.network_passphrase)
sdk.useWallet(masterWallet)

export const api = ApiCaller.getInstance(config.api_url)
api.useWallet(masterWallet)

const DEFAULTS = {
  masterKp: masterKP,
  sdk,
  api
}

export const accountHelper = new Account(DEFAULTS)
export const signerHelper = new Signer(DEFAULTS)
export const assetHelper = new Asset(DEFAULTS)
export const assetPairHelper = new AssetPair(DEFAULTS)
export const balanceHelper = new Balance(DEFAULTS)
export const issuanceHelper = new Issuance(DEFAULTS)
export const requestHelper = new Request(DEFAULTS)
export const saleHelper = new Sale(DEFAULTS)
export const keyValueHelper = new KeyValue(DEFAULTS)
export const offerHelper = new Offer(DEFAULTS)
export const paymentHelper = new Payment(DEFAULTS)
export const withdrawHelper = new Withdraw(DEFAULTS)
export const amlAlertHelper = new AmlAlert(DEFAULTS)
export const stampHelper = new StampHelper(DEFAULTS)
export const licenseHelper = new LicenseHelper(DEFAULTS)
export const atomicSwapAskHelper = new AtomicSwapAsk(DEFAULTS)
export const atomicSwapBidHelper = new AtomicSwapBid(DEFAULTS)
export const pollHelper = new Poll(DEFAULTS)
export const voteHelper = new Vote(DEFAULTS)
export const manageAccountRoleHelper = new ManageAccountRole(DEFAULTS)
export const changeRoleHelper = new ChangeRole(DEFAULTS)
export const kycRecoveryHelper = new KYCRecoveryHelper(DEFAULTS)
export const swapHelper = new Swap(DEFAULTS)
export const redemptionHelper = new Redemption(DEFAULTS)
export const dataHelper = new Data(DEFAULTS)
export const csvParserHelper = new CsvParser(DEFAULTS)
export const deferredPaymentHelper = new DeferredPayment(DEFAULTS)
export const liquidityPoolHelper = new LiquidityPoolHelper(DEFAULTS)
