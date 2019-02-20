import { Keypair } from '../../src/base'
import { populateHistoryForAccount } from '../scripts/make_history'

describe.only('history', () => {
  it('should populate history with different issuance requests', async () => {
    const accountKp = Keypair.fromSecret('SAN5AXYMRILA7WG55GOVQBYOYWZHKASOIXOG3MYMCMKRNSYYNLN2NPO5')

    await populateHistoryForAccount(accountKp.accountId(), accountKp)
  })
})
