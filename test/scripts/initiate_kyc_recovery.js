import { logger } from '../logger'
import { getKvEntryWithFallback } from './get_task_from_kv'
import { KEY_VALUE_KEYS } from '../../src/const'
import { kycRecoveryHelper, requestHelper } from '../helpers'

/**
 *
 * @param {string} address - address of the account
 * @param {string} signer - public key of new signer
 */
export async function initiateKycRecovery (address, signer) {
  const log = logger.new('initiate_kyc_recovery')
  const initResult = await kycRecoveryHelper.initiateKycRecovery({
    signer: signer,
    targetAccount: address
  })
  log.info('KYC recovery has been successfully initialized')
  return initResult
}

export async function prepareForRecovery (recoveryTasks) {
  return kycRecoveryHelper.putKeyValuePairs(recoveryTasks)
}

/**
 *
 * @param {object} opts
 * @param {string} opts.targetAccount
 * @param {string[]} opts.signers - new signers for the target account
 * @param {Keypair} source - request details set by creator
 */
export async function createKycRecovery (opts, source) {
  const log = logger.new('create-kyc-recovery')

  const tasksToRemove = await getKvEntryWithFallback(
    KEY_VALUE_KEYS.createKycRecoveryTasks, 1
  )
  log.info('tasks to remove for create kyc recovery request defined, value: ' + tasksToRemove)

  let signers = []
  opts.signers.forEach(function (pk) {
    signers.push({
      publicKey: pk,
      identity: '1',
      weight: '1000',
      roleID: '1',
      details: {}
    })
  })
  const requestId = await kycRecoveryHelper.createKycRecoveryRequest({
    signers: signers,
    targetAccount: opts.targetAccount
  }, source)

  log.info(`KYC recovery request has been created: ${requestId}`)
  await requestHelper.approve(requestId, { tasksToRemove: tasksToRemove })
  log.info('Approved the kyc recovery request')
}
