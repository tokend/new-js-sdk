import {
  createKycRecovery,
  initiateKycRecovery,
  prepareForRecovery
} from '../scripts/initiate_kyc_recovery'
import { Keypair } from '../../src/base'
import { accountHelper } from '../helpers'
import { logger } from '../logger'

describe('KYC recovery', () => {
  it('Init kyc recovery', async () => {



    const log = logger.new('kyc-recovery')

    const targetAccount = Keypair.random()
    accountHelper.createSyndicate(targetAccount.accountId())
    log.info(`Created account, id: ${targetAccount.accountId()}`)
    const recoverySigner = Keypair.random()
    log.info(`Generated keypair for signer: ${recoverySigner.accountId()}`)

    await prepareForRecovery()
    await initiateKycRecovery(targetAccount.accountId(), recoverySigner.accountId())
    log.info('Successfully initiated kyc recovery request')

    await expectPromiseNoThrow(createKycRecovery({
      signers: [Keypair.random().accountId()],
      targetAccount: targetAccount.accountId(),
    }))
  })
})
