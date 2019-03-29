import { ManageVoteBuilder } from '../../src/base'
import { getSuccessResultFromXDR, Helper } from './_helper'

export class Vote extends Helper {
  /**
   * @param opts
   * @param {string} opts.pollID - is used to restrict using of poll through rules (uint64)
   * @param {number} opts.choice - functional type of poll
   * @param {Keypair} ownerKp
   *
   * @returns {string} the ID of the request
   */
  async create (opts, ownerKp = this.masterKp) {
    const DEFAULTS = {
      pollType: 0,
      choice: 1
    }

    const operation = ManageVoteBuilder.createVote({
      ...DEFAULTS,
      ...opts
    })

    const response = await this.submit(operation, ownerKp)

    return getSuccessResultFromXDR(response.resultXdr, 'manageVoteResult')
  }
}
