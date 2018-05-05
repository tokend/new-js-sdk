import { ResourceGroupBase } from '../../resource_group_base'

/**
 * Blobs.
 */
export class Blobs extends ResourceGroupBase {
  _makeCallBuilder () {
    return this._server._makeCallBuilder()
      .appendUrlSegment('blobs')
      .withSignature()
  }
}
