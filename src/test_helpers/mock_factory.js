import axios from 'axios'
import AxiosMock from 'axios-mock-adapter'
import { Keypair } from '../base'
import { Wallet } from '../wallet'
import { Swarm } from '../sdk'

export default class Mocks {
  static axios () {
    let instance = axios.create()
    let axiosMock = new AxiosMock(instance)

    return { axios: instance, axiosMock }
  }

  static wallet () {
    const email = 'example@mail.com'
    const keypair = Keypair.fromSecret('SANRZWBGCH6L6PPVW5KFHCETRMP6N3NJJD7F2FS54HTCXHVVXMB4BP2F')
    const accountId = keypair.accountId()
    const walletId = '4274027492374237'
    return new Wallet(email, keypair, accountId, walletId)
  }

  static tokenDSdk ({ noWallet = false, legacySignatures = false } = {}) {
    let sdk = new Swarm('https://example.com', { legacySignatures })
    Mocks._mockApiServer(sdk.api)
    Mocks._mockHorizonServer(sdk.horizon)

    if (!noWallet) {
      let wallet = Mocks.wallet()
      sdk.useWallet(wallet)
    }

    return sdk
  }

  static _mockApiServer (server) {
    server = Mocks._mockServerAxios(server)
    server.makeGenericResponse = () => ({
      data: {
        id: 1,
        type: 'generic',
        attributes: {
          foo: 'bar'
        }
      }
    })

    return server
  }

  static _mockHorizonServer (server) {
    server = Mocks._mockServerAxios(server)
    server.makeGenericResponse = () => ({ id: 1 })

    return server
  }

  static _mockServerAxios (server) {
    server._axiosMock = new AxiosMock(server._axios)

    // Add helper interceptors
    server._axios.interceptors.request.use(
      (config) => {
        if (server._sdk.legacySignatures) {
          config.authorized = !!config.headers['X-AuthSignature']
        } else {
          config.authorized = !!config.headers['signature']
        }
        return config
      },
      (err) => Promise.reject(err)
    )

    // Proxy axios mock methods
    let methods = [
      'onGet',
      'onPost',
      'onPut',
      'onPatch',
      'onAny'
    ]
    methods.forEach((method) => {
      server[method] = (...args) => server._axiosMock[method](...args)
    })

    server.reset = () => server._axiosMock.reset()
    server.restore = () => server._axiosMock.restore()

    return server
  }
}
