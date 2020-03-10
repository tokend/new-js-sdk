import { Keypair } from '../../src/base/keypair'
import { fullLicenseSubmit } from '../scripts/license'
import { accountHelper } from '../helpers'
import {default as xdr} from '../../src/base/generated/xdr_generated'

const config = Object.freeze({
  MASTER_SEED: 'SAMJKTZVW5UOHCDK5INYJNORF2HRKYI72M5XSZCBYAHQHR34FFR4Z6G4',
  MASTER_PK: 'GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB',
  WIREDSEEDS: [
      //"SAMJKTZVW5UOHCDK5INYJNORF2HRKYI72M5XSZCBYAHQHR34FFR4Z6G4",
    "SAPC2V2LLLQ5BKIU2GNXVRH3FXASEIKAOOA4G5EGECZJN2Q3CI2XPUKV"
  ]
})

// we don't have secret keys for licensing
describe('License', () => {
  it('Submit valid license', async () => {
    const wiredKPs = [Keypair.fromSecret(config.WIREDSEEDS[0])]
    let opts = {
      adminCount: "3",
      dueDate: "1648480000",
    }
    await fullLicenseSubmit(opts, wiredKPs, accountHelper.masterId)
  })

})
