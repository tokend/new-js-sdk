import { createPayment } from '../scripts/create_payment'

describe('Payment', () => {
  it('should create payment operation and submit it', async () => {
    await createPayment()
  })
})
