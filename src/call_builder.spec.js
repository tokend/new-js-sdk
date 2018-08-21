import sinon from 'sinon'
import axios from 'axios'
import AxiosMock from 'axios-mock-adapter'
import mocks from './test_helpers/mock_factory'

import { CallBuilder } from './call_builder'

describe('CallBuilder', () => {
  let sandbox
  let axiosInstance = axios.create()
  let axiosMock = new AxiosMock(axiosInstance)
  let sdk = mocks.tokenDSdk({ legacySignatures: false })
  let sdkLegacySignatures = mocks.tokenDSdk({ legacySignatures: true })
  let noWalletSdk = mocks.tokenDSdk({ noWallet: true })
  let callBuilder
  let noWalletCallBuilder
  let legacySignaturesCallBuilder

  beforeEach(() => {
    sandbox = sinon.createSandbox()
    callBuilder = new CallBuilder(axiosInstance, sdk)
    noWalletCallBuilder = new CallBuilder(axiosInstance, noWalletSdk)
    legacySignaturesCallBuilder = new CallBuilder(
      axiosInstance,
      sdkLegacySignatures
    )
  })

  afterEach(() => {
    axiosMock.reset()
    sandbox.restore()
  })

  describe('.constructor', () => {
    it('Should create a call builder instance', () => {
      expectNoThrow(() => new CallBuilder(axiosInstance))
    })

    it('Should throw if no axios instance provided', () => {
      expectThrow(() => new CallBuilder())
    })
  })

  const contact = { id: 1, name: 'John Smith' }

  describe('.appendUrlSegment', () => {
    it('Should append a number to the request URL.', () => {
      const contactId = 3432423

      axiosMock
        .onGet(`/contacts/${contactId}`)
        .reply(200, contact)

      return callBuilder
        .appendUrlSegment('contacts')
        .appendUrlSegment(contactId)
        .get()
    })

    it('Should append a simple string to the request URL.', () => {
      const contactId = 'foo'

      axiosMock
        .onGet(`/contacts/${contactId}`)
        .reply(200, contact)

      return callBuilder
        .appendUrlSegment('contacts')
        .appendUrlSegment(contactId)
        .get()
    })

    it('Should append a complex URL segment to the request URL.', () => {
      const subPath = '/foo/bar'

      axiosMock
        .onGet(`/contacts/foo/bar`)
        .reply(200, contact)

      return callBuilder
        .appendUrlSegment('contacts')
        .appendUrlSegment(subPath)
        .get()
    })

    it('Should throw if the provided segment is not a string or a number.', () => {
      expectThrow(() => callBuilder.appendUrlSegment({ foo: 'bar' }))
    })
  })

  describe('.appendAccountId', () => {
    it(`Should use wallet's account ID.`, async () => {
      axiosMock
        .onGet(`/accounts/${sdk.wallet.accountId}`)
        .reply(200, contact)

      await callBuilder
        .appendUrlSegment('accounts')
        .appendAccountId()
        .get()
    })

    it(`Should use custom account ID.`, async () => {
      const accountId = 'GDCB5EOW2EIDENABVPRLRSBPL746DWGBMOZDWMVCRXBQQFOLLARTVNQ3'
      axiosMock
        .onGet(`/accounts/${accountId}`)
        .reply(200, contact)

      await callBuilder
        .appendUrlSegment('accounts')
        .appendAccountId(accountId)
        .get()
    })

    it(`Should throw if an invalid account ID provided.`, () => {
      expectThrow(() => noWalletCallBuilder.appendAccountId('bad id'))
    })

    it(`Should throw if now account ID present.`, () => {
      expectThrow(() => noWalletCallBuilder.appendAccountId())
    })
  })

  describe('.withSignature', () => {
    it('Should require request signature if a default wallet is present.', () => {
      expectNoThrow(() => callBuilder.withSignature())
    })

    it('Should use a wallet passed as an argument.', () => {
      let noAuthCallBuilder = new CallBuilder(axiosInstance)
      expectNoThrow(() => noAuthCallBuilder.withSignature(sdk.wallet))
    })

    it('Should sign a request.', async () => {
      const timestamp = Date.UTC(2018, 3, 4) / 1000
      sandbox.useFakeTimers(timestamp * 1000)

      axiosMock.onAny()
        .reply(config => {
          // 'Date' http header is not allowed to be set in most browsers, so we don't set it for now
          // expect(config.headers)
          //   .to.have.a.property('date')
          //   .equal('Wed, 04 Apr 2018 00:00:00 GMT')
          expect(config.headers)
            .to.have.a.property('signature')
            // same here
            // .equal(`keyId="GB65IHVVJOGUYKZLHT3GAZOWHCBMZLQLDJAWXJM5LUXI35LNAHHBQUKB",algorithm="ed25519-sha256",headers="(request-target) date",signature="iAteM8F+Y6Tl88RFN460FPXwEcQ3FN9apW4feZTQJRA7ZiMP0m3oH8k8JimsQT9lH3jtrdzuXGQAAPPE5VH+CQ=="`)
            .equal(`keyId="GB65IHVVJOGUYKZLHT3GAZOWHCBMZLQLDJAWXJM5LUXI35LNAHHBQUKB",algorithm="ed25519-sha256",headers="(request-target)",signature="OhOfLyXQzt5ejT4sdGTQxsXSQ0X4YJwD4UaHlQPqTarZYqB79srecuOCm15bv6jXbWbI7jJYWhdgLzw4qprMCQ=="`)

          return [200, {}]
        })

      await callBuilder.withSignature().get()
    })

    it('Should sign a request(legacy).', async () => {
      const timestamp = Date.UTC(2018, 3, 4) / 1000
      sandbox.useFakeTimers(timestamp * 1000)

      axiosMock.onAny()
        .reply(config => {
          expect(config.headers)
            .to.have.a.property('X-AuthPublicKey')
            .equal(sdk.wallet.accountId)
          expect(config.headers)
            .to.have.a.property('X-AuthSignature')
            .equal('bQHOGAAAAEDuZW71sEhG6IgVBZ/avvM5ZNOF3BCyYGJ7einbPb4Cyhr/s3Hdl14zf2/Q3zAbFJb6KaqFTmidyuGOYykIV3UC')
          expect(config.headers)
            .to.have.a.property('X-AuthValidUnTillTimestamp')
            .equal('1522800060')

          return [200, {}]
        })

      await legacySignaturesCallBuilder.withSignature().get()
    })

    it('Should throw if there is no wallet attached.', () => {
      expectThrow(() => noWalletCallBuilder.withSignature())
    })
  })

  describe('.withTimeout', () => {
    const customTimeout = 1337

    it('Should set a custom request timeout.', async () => {
      axiosMock
        .onGet(`/`, { timeout: customTimeout })
        .reply(200, contact)

      await callBuilder
        .withTimeout(customTimeout)
        .get()
    })

    it('Should throw if the timeout is invalid.', () => {
      expectThrow(() => callBuilder.withTimeout('bitconneeeeect'))
    })
  })

  describe('.get', () => {
    const data = [contact]
    const queryParams = { name: 'Jo' }

    it('Should perform a GET request.', async () => {
      axiosMock
        .onGet(`/contacts`, { params: queryParams })
        .reply(200, data)

      let response = await callBuilder
        .appendUrlSegment('contacts')
        .get(queryParams)

      expect(response).to.have.a.property('data').deep.equal(data)
    })
  })

  describe('.post', () => {
    it('Should perform a POST request.', async () => {
      axiosMock
        .onPost(`/contacts`)
        .reply(config => {
          expect(config.data).equal(JSON.stringify(contact))

          return [200, contact]
        })

      let response = await callBuilder
        .appendUrlSegment('contacts')
        .post(contact)

      expect(response)
        .to.have.a.property('data')
        .deep.equal(contact)
    })
  })

  describe('.put', () => {
    it('Should perform a PUT request.', async () => {
      axiosMock
        .onPut(`/contacts/${contact.id}`)
        .reply(config => {
          expect(config.data).equal(JSON.stringify(contact))

          return [200, contact]
        })

      let response = await callBuilder
        .appendUrlSegment('contacts')
        .appendUrlSegment(contact.id)
        .put(contact)

      expect(response)
        .to.have.a.property('data')
        .deep.equal(contact)
    })
  })

  describe('.patch', () => {
    it('Should perform a PUT request.', async () => {
      axiosMock
        .onPatch(`/contacts/${contact.id}`)
        .reply(config => {
          expect(config.data).equal(JSON.stringify(contact))

          return [200, contact]
        })

      let response = await callBuilder
        .appendUrlSegment('contacts')
        .appendUrlSegment(contact.id)
        .patch(contact)

      expect(response)
        .to.have.a.property('data')
        .deep.equal(contact)
    })
  })

  describe('.delete', () => {
    it('Should perform a DELETE request.', async () => {
      axiosMock
        .onDelete(`/contacts/${contact.id}`)
        .reply(204)

      let response = await callBuilder
        .appendUrlSegment('contacts')
        .appendUrlSegment(contact.id)
        .delete()

      expect(response).to.have.a.property('status').equal(204)
    })
  })
})
