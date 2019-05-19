import {
  createKycRecovery,
  initiateKycRecovery,
  prepareForRecovery
} from '../scripts/initiate_kyc_recovery'
// import { createKycRecovery } from '../scripts/initiate_kyc_recovery'
import { Keypair } from '../../src/base'
import { accountHelper } from '../helpers'
import { logger } from '../logger'
import {kycRecoveryHelper} from '../helpers'

describe('KYC recovery', () => {
  // it('Init kyc recovery', async () => {
  //   const log = logger.new('kyc-recovery')
  //
  //   const targetAccount = Keypair.random()
  //   accountHelper.createSyndicate(targetAccount.accountId())
  //   log.info(`Created account, id: ${targetAccount.accountId()}`)
  //   const recoverySigner = Keypair.random()
  //   log.info(`Generated keypair for signer: ${recoverySigner.accountId()}`)
  //   await prepareForRecovery('0')
  //   let recoveryResult = await initiateKycRecovery(targetAccount.accountId(), recoverySigner.accountId())
  //   log.info('Successfully initiated kyc recovery request')
  // })

  it('Init kyc recovery', async () => {
    const log = logger.new('kyc-recovery')
    const targetAccount = Keypair.random()
    accountHelper.createSyndicate(targetAccount.accountId())
    log.info(`Created account, id: ${targetAccount.accountId()}`)
    const recoverySigner = Keypair.random()
    log.info(`Generated keypair for signer: ${recoverySigner.accountId()}`)
    await prepareForRecovery('0')
    await initiateKycRecovery(targetAccount.accountId(), recoverySigner.accountId())
    log.info('Successfully initiated kyc recovery request')

    await createKycRecovery({
      creatorDetails: {},
      signers: [Keypair.random().accountId()],
      targetAccount: targetAccount.accountId()
    })
  })
})
