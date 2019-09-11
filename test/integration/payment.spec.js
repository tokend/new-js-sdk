import { createPayment, createPaymentRequest } from '../scripts/create_payment'
import { keyValueHelper } from '../helpers'
import { KEY_VALUE_KEYS } from '../../src/const'

describe('Payment', () => {
  it('should create payment request and auto approve it', async() => {
    await keyValueHelper.putEntries({
      [ KEY_VALUE_KEYS.paymentCreateTasks + ':*:*' ]: 0
    })
    await createPaymentRequest()
  })
  it('should create payment operation and submit it', async () => {
    await createPayment()
  })
})
