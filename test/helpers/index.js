import config from '../config'

import { TokenD } from '../../src'
import { base } from '../../src'

import { Account } from './account'
import { Asset } from './asset'
import { Request } from './request'

const DEFAULTS = {
  sdk: new TokenD(config.api_url, {
    allowHttp: config.allow_http,
  }),
  masterKp: base.Keypair.fromSecret(config.master_seed)
}

export const account = new Account(DEFAULTS)
export const asset = new Asset(DEFAULTS)
export const request = new Request(DEFAULTS)
