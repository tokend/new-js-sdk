import {
  manageAccountRoleHelper,
  accountHelper,
  changeRoleHelper,
  keyValueHelper
} from '../helpers'
import { Keypair } from '../../src/base'
import { KEY_VALUE_KEYS } from '../../src/const'

describe('Change role request', () => {
  it('should create and cancel change role request', async () => {
    const account = Keypair.random()
    await accountHelper.createSyndicate(account.accountId())

    let roleId = await manageAccountRoleHelper.create()

    await keyValueHelper.putEntries({
      [KEY_VALUE_KEYS.change_role_tasks]: 1
    })

    let requestId = await changeRoleHelper.create({
      destinationAccount: account.accountId(),
      accountRoleToSet: roleId
    }, account)

    await changeRoleHelper.cancel(requestId, account)
  })
})
