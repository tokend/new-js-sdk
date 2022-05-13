import {
  signerRoleHelper
} from '../helpers'

describe.skip('Manage signer role', () => {
  it('should update signer role', async () => {

    await expectPromiseNoThrow(signerRoleHelper.updateRole({id: '4', ruleIDs: ['6', '9']}))
  })
})
