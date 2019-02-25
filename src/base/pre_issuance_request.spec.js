import { Keypair } from './keypair'
import { PreIssuanceRequest } from './pre_issuance_request'

describe('PreIssuanceRequest', () => {
  it('success', () => {
    let amount = '200.123'
    let reference = 'test'
    let asset = 'BLC'
    let keyPair = Keypair.random()
    let creatorDetails = { 'data': 'some details' }
    let preIssuanceRequest = PreIssuanceRequest.build({
      amount,
      reference,
      asset,
      keyPair,
      creatorDetails
    })
    let recovered = PreIssuanceRequest.dataFromXdr(preIssuanceRequest)
    expect(reference).to.be.equal(recovered.reference)
    expect(amount).to.be.equal(recovered.amount)
    expect(asset).to.be.equal(recovered.asset)
    let isSigned = PreIssuanceRequest.isXdrPreIssuanceRequestSigned(
      preIssuanceRequest,
      keyPair
    )
    expect(isSigned).to.be.true
    expect(JSON.stringify(creatorDetails)).to.equal(JSON.stringify(recovered.creatorDetails))
  })
})
