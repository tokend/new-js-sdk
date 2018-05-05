import axios from 'axios'
import AxiosMock from 'axios-mock-adapter'
import { Keypair } from '../base'
import { Wallet } from '../wallet'
import { Horizon } from '../horizon/horizon'
import { Api } from '../api/api'

export default class Mocks {
  static axios () {
    let instance = axios.create()
    let axiosMock = new AxiosMock(instance)
    Mocks._axiosAuthHelper(instance)

    return { axios: instance, axiosMock }
  }

  static wallet () {
    const email = 'example@mail.com'
    const keypair = Keypair.fromSecret('SANRZWBGCH6L6PPVW5KFHCETRMP6N3NJJD7F2FS54HTCXHVVXMB4BP2F')
    const accountId = keypair.accountId()
    const walletId = '4274027492374237'
    return new Wallet(email, keypair, accountId, walletId)
  }

  static horizon () {
    let horizon = new Horizon('https://example.com')
    horizon = Mocks._mockServerAxios(horizon)

    let wallet = Mocks.wallet()
    horizon.useWallet(wallet)

    return horizon
  }

  static api () {
    let api = new Api('https://example.com')
    api = Mocks._mockServerAxios(api)

    let wallet = Mocks.wallet()
    api.useWallet(wallet)

    return api
  }

  static _mockServerAxios (server) {
    server._axiosMock = new AxiosMock(server._axios)

    // Add helper interceptors
    server._axios.interceptors.request.use(
      (config) => {
        config.authorized = !!config.headers['X-AuthSignature']
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
