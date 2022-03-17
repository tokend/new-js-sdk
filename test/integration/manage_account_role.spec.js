import {
  manageAccountRoleHelper,
  accountHelper,
  changeRoleHelper,
  keyValueHelper,
  api,
} from '../helpers'
import { KEY_VALUE_KEYS } from '../../src/const'

describe.skip('Manage account role', () => {
  it('should update account role', async () => {
    let data = await api.getWithSignature('/v3/account_roles/')

    console.log(JSON.stringify(data.data))
    console.log(data.data.rules)

    let ruleIDs = []
    data.data.rules.forEach(element => {
      ruleIDs.push(element.id)
    });

    ruleIDs.push('22')

    console.log(ruleIDs)

    let roleId = await manageAccountRoleHelper.update({ruleIDs: ruleIDs, roleId: ''})
  })
})
