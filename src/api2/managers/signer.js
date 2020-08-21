
export class Signer {
/**
 * SignersManager constructor.
 * @param {string} opts.id public key of signer
 * @param {number} opts.roleId role id
 * @param {number} opts.weight signer weight
 * @param {number} opts.identity signer identity
 *
 */
  constructor (opts) {
    this.type = 'signer'
    this.id = opts.id
    this.attributes = {
      role_id: opts.roleId,
      weight: opts.weight ? opts.weight : 1000,
      identity: typeof opts.identity === 'number' ? opts.identity : 1
    }
  }
}
