import { Running } from './_running'
import { getSuccessResultFromXDR, Helper } from './_helper'
import { ApiCaller } from '../../src/api2/api-caller'
import { Wallet } from '../../src/wallet'
import * as config from '../config'
import { InitiateKYCRecoveryBuilder } from '../../src/base/operations/initiate_kyc_recovery_builder'
import { CreateKYCRecoveryRequestBuilder } from '../../src/base/operations/create_kyc_recovery_request_builder'
import { Keypair, ManageKeyValueBuilder } from '../../src/base'
import { KEY_VALUE_KEYS } from '../../src/const'
import { isUndefined } from 'lodash'

export class KYCRecoveryHelper extends Helper {
  /**
   * @param opts
   * @param {string} opts.targetAccount - target account of kyc recovery
   * @param {string} opts.signer - new signer to set for the target account
   * @param {Keypair} source - source of the operation. Defaults to master.
   * @returns {string} the ID of the request
   */
  async initiateKycRecovery (opts, source = this.masterKp) {
    // create kv pairs

    const operation = InitiateKYCRecoveryBuilder.initiateKycRecovery({
      signer: opts.signer,
      targetAccount: opts.targetAccount
    })

    const response = await this.submit(operation, source)

    return getSuccessResultFromXDR(response.resultXdr, 'initiateKycRecoveryResult')
  }
  /**
    * @param {object} opts
    * @param {string} opts.targetAccount - kyc recovery target account
    * @param {object[]} opts.signersData - new signers for account
    * @param {string} opts.signersData.publicKey - public key of new signer
    * @param {string} opts.signersData.roleID - id of role for signer
    * @param {string} opts.signersData.weight - weight of signer up to 1000
    * @param {string} opts.signersData.identity - identity of signer
    * @param {object} opts.signersData.details - json object with details
    * @param {object} opts.creatorDetails - Additional details about request
    * @param {number} opts.allTasks - tasks to set on request creation.
    * @param {Keypair} source - source of the operation. Defaults to master
  */
  async createKycRecoveryRequest (opts, source) {
    const DEFAULTS = {
      allTasks: 1,
      creatorDetails: {
        description: 'Need to recover my account'
      },
      requestID: '0'
    }
    const operation = CreateKYCRecoveryRequestBuilder.create({
      ...DEFAULTS,
      ...opts
    })
    if (isUndefined(source)) {
      source = this.masterKp
    }
    const response = await this.submit(operation, source)
    return getSuccessResultFromXDR(response.resultXdr, 'createKycRecoveryRequestResult')
  }
  /**
   * @param {object} opts
   * @param {string} opts.targetAccount - kyc recovery target account
   * @param {string} opts.requestID - id of the reviewable request. Defaults to zero.
   * @param {object[]} opts.signersData - new signers for account
   * @param {string} opts.signersData.publicKey - public key of new signer
   * @param {string} opts.signersData.roleID - id of role for signer
   * @param {string} opts.signersData.weight - weight of signer up to 1000
   * @param {string} opts.signersData.identity - identity of signer
   * @param {object} opts.signersData.details - json object with details
   * @param {object} opts.creatorDetails - Additional details about request
   * @param {number} opts.allTasks - tasks to set on request creation.
   * @param {string} requestID - id of the request to update
   * @param {Keypair} source - source of the operation. Defaults to master
   */
  async updateKycRecoveryRequest (opts, requestID, source) {
    const DEFAULTS = {
      creatorDetails: {
        description: 'Need to recover my account'
      }
    }
    const operation = CreateKYCRecoveryRequestBuilder.update({
      ...DEFAULTS,
      ...opts
    }, requestID)
    if (isUndefined(source)) {
      source = this.masterKp
    }
    const response = await this.submit(operation, source)
    return getSuccessResultFromXDR(response.resultXdr, 'createKycRecoveryRequestResult')
  }

  mustLoadById (id) {
    return Running.untilFound(async () => {
      let api = ApiCaller.getInstance(config.api_url)
      api._wallet = new Wallet(
        'qqq123@mail.com',
        Keypair.random(),
        Keypair.random().accountId(),
        'anyRandomStringWeDoNotCareNow'
      )

      const { data } = await api.get('/v3/create_kyc_recovery_request/' + id)
      return data
    })
  }
  /**
   * @param {string} recoveryTasks
  */
  putKeyValuePairs (recoveryTasks) {
    let ops = []
    ops.push(ManageKeyValueBuilder.putKeyValue({
      key: KEY_VALUE_KEYS.kycRecoveryEnabled,
      value: '1',
      entryType: 1
    }))
    ops.push(ManageKeyValueBuilder.putKeyValue({
      key: KEY_VALUE_KEYS.kycRecoverySignerRole,
      value: '1',
      entryType: 3
    }))
    ops.push(ManageKeyValueBuilder.putKeyValue({
      key: KEY_VALUE_KEYS.createKycRecoveryTasks,
      value: recoveryTasks,
      entryType: 1
    }))
    return this.submit(ops)
  }
}
