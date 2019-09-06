import { createPayment, createPaymentRequest } from '../scripts/create_payment'

describe('Payment', () => {
  it('should create payment request and auto approve it', async() => {
    await createPaymentRequest()
  })
  it('should create payment operation and submit it', async () => {
    await createPayment()
  })
})
