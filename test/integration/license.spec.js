import { Keypair } from '../../src/base/keypair'
import { fullLicenseSubmit } from '../scripts/license'
import { accountHelper } from '../helpers'
import {default as xdr} from '../../src/base/generated/xdr_generated'

const config = Object.freeze({
  MASTER_SEED: 'SAMJKTZVW5UOHCDK5INYJNORF2HRKYI72M5XSZCBYAHQHR34FFR4Z6G4',
  MASTER_PK: 'GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB',
  WIREDSEEDS: [
    "SAMJKTZVW5UOHCDK5INYJNORF2HRKYI72M5XSZCBYAHQHR34FFR4Z6G4",
    "SBQ3YVRINQOJDT6FQD3EFMZ5THZFWVSQ37RZYTFZBF3TEE5GPBS6NNXD"
  ]
})

describe('License', () => {
  it('Submit valid license', async () => {
    const wiredKPs = [Keypair.fromSecret(config.WIREDSEEDS[0]), Keypair.fromSecret(config.WIREDSEEDS[1])]
    let opts = {
      adminCount: "3",
      dueDate: "1648480000",
    }
    await fullLicenseSubmit(opts, wiredKPs, accountHelper.masterId)
  })

})
