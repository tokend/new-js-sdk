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
     * @param {Swarm} sdk SDK instance.
     */
  constructor (server, sdk) {
    this._server = server
    this._sdk = sdk
  }
}
