import xdr from '../generated/xdr_generated'

export class UpdateDataBuilder {
  /**
   * Update data //todo describe
   */
  static updateData (opts) {
    let op = new xdr.UpdateDataOp()

    let opAttributes = {}
    opAttributes.body = xdr.OperationBody.updateData(op)
    return new xdr.operation(opAttributes)
  }
}
