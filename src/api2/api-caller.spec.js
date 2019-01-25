// import AxiosMock from 'axios-mock-adapter'
// import axios from 'axios'
import sinon from 'sinon'
import { Keypair } from '../base'
import { Wallet } from '../wallet'
import { ApiCaller } from './api-caller'

import middlewares from './middlewares'

describe('api-caller unit test', () => {
  describe('._call method', () => {
    let sandbox
    let api

    beforeEach(() => {
      api = ApiCaller.getInstance('http://black.hole')
      sandbox = sinon.createSandbox()

      sandbox.stub(api, '_axios')
      sandbox.stub(middlewares, 'signRequest')
      sandbox.stub(middlewares, 'parseQuery')
      sandbox.stub(middlewares, 'setJsonapiHeaders')
      sandbox.stub(middlewares, 'parseJsonapiResponse')
    })

    afterEach(() => {
      middlewares.signRequest.restore()
      middlewares.parseQuery.restore()
      middlewares.setJsonapiHeaders.restore()
      middlewares.parseJsonapiResponse.restore()
    })

    it('should set headers before signing the request', async () => {
      api._wallet = new Wallet(
        'qqq123@mail.com',
        Keypair.random(),
        Keypair.random().accountId(),
        'anyRandomStringWeDoNotCareNow'
      )

      await api._call('/foo/bar', {}, 'GET', true)

      expect(middlewares.setJsonapiHeaders).to.have.been
        .calledBefore(middlewares.signRequest)
    })
  })
})
