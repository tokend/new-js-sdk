/**
 * Represents interaction with a resource group withing server.
 *
 * @class
 */
export class ResourceGroupBase {
  /**
     * Resource group constructor.
     *
     * @param {ServerBase} server A server instance to which this resource group belongs.
     */
  constructor (server) {
    this._server = server
  }
}
