import xdr from '../generated/xdr_generated'

export class DeleteDataBuilder {
  /**
   * Delete data //todo describe
   */
  static removeData (opts) {
    let op = new xdr.RemoveDataOp()

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.removeData(op)
    return new xdr.operation(opAttributes)
  }
}
