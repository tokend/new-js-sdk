import config from '../config'

import { TokenD, base } from '../../src'

import { Account } from './account'
import { Asset } from './asset'
import { AssetPair } from './asset_pair'
import { Balance } from './balance'
import { Issuance } from './issuance'
import { KeyValue } from './key_value'
import { Offer } from './offer'
import { Request } from './request'
import { Sale } from './sale'
import { StampHelper } from './stamp'
import { LicenseHelper } from './license'
import { SetOptionsHelper } from './set_options'

export const sdk = new TokenD(config.api_url, {
  allowHttp: config.allow_http
})

sdk._useNetworkPassphrase(config.network_passphrase)

const DEFAULTS = {
  masterKp: base.Keypair.fromSecret(config.master_seed),
  sdk
}

export const accountHelper = new Account(DEFAULTS)
export const assetHelper = new Asset(DEFAULTS)
export const assetPairHelper = new AssetPair(DEFAULTS)
export const balanceHelper = new Balance(DEFAULTS)
export const issuanceHelper = new Issuance(DEFAULTS)
export const requestHelper = new Request(DEFAULTS)
export const saleHelper = new Sale(DEFAULTS)
export const keyValueHelper = new KeyValue(DEFAULTS)
export const offerHelper = new Offer(DEFAULTS)
export const stampHelper = new StampHelper(DEFAULTS)
export const licenseHelper = new LicenseHelper(DEFAULTS)
export const setOptionsHelper = new SetOptionsHelper(DEFAULTS)
