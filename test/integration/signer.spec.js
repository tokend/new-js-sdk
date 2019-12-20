import {Keypair} from "../../src/base";
import {accountHelper, keyValueHelper, signerHelper} from "../helpers";
import { logger } from '../logger'
import {getKvEntryWithFallback} from "../scripts/get_task_from_kv";
import {KEY_VALUE_KEYS} from "../../src/const";
import { ApiCaller } from '../../src/api2/api-caller';
import { SignersManager } from "../../src/api2/managers";
import * as config from '../config'

describe.only('signer', () => {
  it('should create two accounts with signers and transfer signer from one to another account', async () => {
    const log = logger.new('transfer_signer')

    let kpSignerProvider = Keypair.random()
    let role = '1'

    await accountHelper.create({
      id: kpSignerProvider.accountId(),
      roleID: role,
    })
    log.info(`created signer provider account with id ${kpSignerProvider.accountId()}`)

    const signerRoleDefaultValue = await getKvEntryWithFallback(KEY_VALUE_KEYS.signerRoleDefault, 2)
    const signerRoleDefaultStrValue = `${signerRoleDefaultValue}`
    let randomSignerKp = Keypair.random()
    await signerHelper.create({
      id: randomSignerKp.accountId(),
      roleID: signerRoleDefaultStrValue,
      weight: '1000'
    }, kpSignerProvider)

    log.info(`created signer for transferring, signer_public_key: ${randomSignerKp.accountId()} (account ${kpSignerProvider.accountId()})`)

    let kpSignerReceiver = Keypair.random()
    await accountHelper.create({
      id: kpSignerReceiver.accountId(),
      roleID: role,
    })
    log.info(`created signer receiver account with id ${kpSignerReceiver.accountId()}`)

    const sm = new SignersManager(ApiCaller.getInstance(config.api_url))
    const providerDefaultSigners = (await sm._getNonRecoverySigners(kpSignerProvider.accountId())).filter(signer => signer.role.id === signerRoleDefaultStrValue)

    expect(providerDefaultSigners.length).to.be.equal(1)

    const providersDefaultSigner = providerDefaultSigners[0]
    log.info(`got provider's default signer: { id: ${providersDefaultSigner.id}, role: ${providersDefaultSigner.role.id} }`)

    await signerHelper.create({
      id: providersDefaultSigner.id,
      roleID: providersDefaultSigner.role.id // TODO [for testing operationally] create custom signer role & pass it here
    }, kpSignerReceiver)

    const receiverSigners = (await sm._getSigners(kpSignerReceiver.accountId())).filter(signer => signer.id === providersDefaultSigner.id && signer.account.id === kpSignerReceiver.accountId())
    expect(receiverSigners.length).to.be.equal(1)
    const transferredSigner = receiverSigners[0]
    expect(transferredSigner.id).to.be.equal(providersDefaultSigner.id)

    log.info(`created (transferred) signer for receiver account: { publicKey: ${transferredSigner.id}, role: ${transferredSigner.role.id} }`)
  });
})