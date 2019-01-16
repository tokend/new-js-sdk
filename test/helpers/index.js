import config from '../config'

import { TokenD, base } from '../../src'

import { Account } from './account'
import { Asset } from './asset'
import { AssetPair } from './asset_pair'
import { KeyValue } from './key_value'
import { Request } from './request'
import { Sale } from './sale'

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
export const requestHelper = new Request(DEFAULTS)
export const saleHelper = new Sale(DEFAULTS)
export const keyValueHelper = new KeyValue(DEFAULTS)
