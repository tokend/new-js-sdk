import { initRedemption, approveRedemption } from '../scripts/redemption'
import { logger } from '../logger'

describe('Redemption', () => {
  it('should create redemption request op and submit it', async () => {
    let log = logger.new('redemption')
    const requestID = await initRedemption()

    log.info(`created redemption request, id: ${requestID}`)

    await approveRedemption(requestID)
    log.info(`approved redemption request with id ${requestID}`)
  })
})
