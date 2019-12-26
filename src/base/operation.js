import xdr from './generated/xdr_generated'
import { encodeCheck } from './strkey'
import { BaseOperation } from './operations/base_operation'
import { ReviewRequestBuilder } from './operations/review_request_builder'
import { CreateAccountBuilder } from './operations/create_account_builder'
import { PaymentBuilder } from './operations/payment_builder'
import { InitiateKYCRecoveryBuilder } from './operations/initiate_kyc_recovery_builder'
import { ManageSignerBuilder } from './operations/manage_signer_builder'
import { IssuanceBuilder } from './operations/issuance_builder'
import { KYCRecoveryBuilder } from './operations/kyc_recovery_builder'
import { ManageKeyValueBuilder } from './operations/manage_key_value_builder'
import { ChangeAccountRolesBuilder } from './operations/change_account_roles_builder'
import { ManageDataBuilder } from './operations/manage_data_builder'

export class Operation extends BaseOperation {
  /**
   * Converts the XDR Operation object to the opts object used to create the XDR
   * operation.
   * @param {xdr.Operation} operation - An XDR Operation.
   * @return {Operation}
   */
  static operationToObject (operation) {
    function accountIdtoAddress (accountId) {
      return encodeCheck('accountId', accountId.ed25519())
    }

    let result = {}
    if (operation.sourceAccount()) {
      result.source = accountIdtoAddress(operation.sourceAccount())
    }

    let attrs = operation.body().value()
    result.type = operation.body().switch().name
    switch (operation.body().switch()) {
      case xdr.OperationType.createAccount():
        CreateAccountBuilder.createAccountToObject(result, attrs)
        break
      case xdr.OperationType.reviewRequest():
        ReviewRequestBuilder.reviewRequestToObject(result, attrs)
        break
      case xdr.OperationType.payment():
        PaymentBuilder.paymentToObject(result, attrs)
        break
      case xdr.OperationType.createSigner():
        ManageSignerBuilder.createSignerToObject(result, attrs)
        break
      case xdr.OperationType.updateSigner():
        ManageSignerBuilder.updateSignerToObject(result, attrs)
        break
      case xdr.OperationType.removeSigner():
        ManageSignerBuilder.removeSignerToObject(result, attrs)
        break
      case xdr.OperationType.initiateKycRecovery():
        InitiateKYCRecoveryBuilder.initiateKYCRecoveryToObject(result, attrs)
        break
      case xdr.OperationType.issuance():
        IssuanceBuilder.issuanceToObject(result, attrs)
        break
      case xdr.OperationType.kycRecovery():
        KYCRecoveryBuilder.kycRecoveryOpToObject(result, attrs)
        break
      case xdr.OperationType.putKeyValue():
        ManageKeyValueBuilder.putKeyValueOpToObject(result, attrs)
        break
      case xdr.OperationType.removeKeyValue():
        ManageKeyValueBuilder.removeKeyValueOpToObject(result, attrs)
        break
      case xdr.OperationType.changeAccountRole():
        ChangeAccountRolesBuilder.changeAccountRolesOpToObject(result, attrs)
        break
      case xdr.OperationType.createDatum():
        ManageDataBuilder.createDataToObject(result, attrs)
        break
      case xdr.OperationType.updateDatum():
        ManageDataBuilder.updateDataToObject(result, attrs)
        break
      case xdr.OperationType.removeDatum():
        ManageDataBuilder.removeDataToObject(result, attrs)
        break
      default:
        throw new Error('Unknown operation')
    }
    return result
  }
}
