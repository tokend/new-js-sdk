import { WalletsManager } from '../../src/api2/managers/wallets-manager'
import { ApiCaller, base } from '../../src'
import { logger } from '../logger'
import config from "../config";

describe('Seed recovery', () => {
    it('should create wallet and recovered', async () => {
        const log = logger.new('seedRecovery')
        const user = {
            email: 'testbob11@mail.com',
            password: 'qweqweqwe',
            newPassword: 'qwe123qwe123',
            recoveryKeypair: base.Keypair.random()
        }
        const api = ApiCaller.getInstance(config.api_url)
        const walletsManager = new WalletsManager(api)
        log.info('create wallet')
        const { recoverySeed, wallet } = await walletsManager.create(
            user.email,
            user.password,
            user.recoveryKeypair
        )
        log.info('wallet created')
        const newWallet = await walletsManager.recovery(
            user.email,
            recoverySeed,
            user.newPassword
        )
        log.info('wallet recovered')

        expect(wallet.accountId).to.be
            .equal(newWallet.accountId)
        expect(wallet.secretSeed).not.to.be
            .equal(newWallet.secretSeed)
        expect(wallet.keypair.accountId()).not.to.be
            .equal(newWallet.keypair.accountId())
    })
})
