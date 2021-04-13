import { hash, Keypair } from '../../src/base'
import { accountHelper, swapHelper, assetHelper, balanceHelper } from '../helpers'
import { logger } from '../logger'
import { createAndApproveAsset } from '../scripts/create_asset'
import { Asset } from '../helpers/asset'
import { createFundedGeneral } from '../scripts/create_account'
import nacl from 'tweetnacl'
import moment from 'moment'

describe('Swaps', () => {
  it('should create swap and close it', async () => {
    const log = logger.new('swaps')

    const assetCode = Asset.randomCode('BASE')
    await Promise.all([
      createAndApproveAsset({
        code: assetCode,
        policies: 130,
      }),
    ])
    log.info(`Created asset, code: ${assetCode}`)

    let amount = '1000'
    const payer = await createFundedGeneral({
      [assetCode]: amount,
    })
    log.info(`Created the swap creator account, id: ${payer.accountId}`)

    const receiver = Keypair.random()
    await accountHelper.createSyndicate(receiver.accountId())
    log.info(`Created the receiver account, id: ${receiver.accountId()}`)

    let sourceBalance = await balanceHelper.mustLoad(payer.accountId, assetCode)
    log.info(`Loaded source balance ${sourceBalance.balanceId}`)

    let secret = nacl.randomBytes(32)
    let secretHash = hash(secret).toString('hex')

    let swapId = await swapHelper.create({
        destination: receiver.accountId(),
        sourceBalance: sourceBalance.balanceId,
        amount: '100.0',
        feeData: {
          sourceFee: {
            percent: '1',
            fixed: '1'
          },
          destinationFee: {
            percent: '1',
            fixed: '1'
          },
          sourcePaysForDest: true
        },
        lockTime: '' + moment().add(60, 's').format('X'),
        details: {
          name: 'swap',
          description: 'Some stuff'
        },
        secretHash: secretHash,
        source: payer.accountId
      },
      payer.accountKp
    )
    log.info(`Created swap, id ${swapId}`)

    let secretHex = Buffer.from(secret, 'hex')
    await swapHelper.close(swapId, secretHex, receiver)

    await swapHelper.mustLoadClosed(swapId)
  })

  it('should create swap and cancel it', async () => {
    const log = logger.new('swaps')

    const assetCode = Asset.randomCode('BASE')
    await Promise.all([
      createAndApproveAsset({
        code: assetCode,
        policies: 130,
      }),
    ])
    log.info(`Created asset, code: ${assetCode}`)

    let amount = '1000'
    const payer = await createFundedGeneral({
      [assetCode]: amount,
    })
    log.info(`Created the swap creator account, id: ${payer.accountId}`)

    const receiver = Keypair.random()
    await accountHelper.createSyndicate(receiver.accountId())
    log.info(`Created the receiver account, id: ${receiver.accountId()}`)

    let sourceBalance = await balanceHelper.mustLoad(payer.accountId, assetCode)
    log.info(`Loaded source balance ${sourceBalance.balanceId}`)

    let secret = nacl.randomBytes(32)
    let secretHash = hash(secret).toString('hex')

    let swapId = await swapHelper.create({
        destination: receiver.accountId(),
        sourceBalance: sourceBalance.balanceId,
        amount: '100.0',
        feeData: {
          sourceFee: {
            percent: '1',
            fixed: '1'
          },
          destinationFee: {
            percent: '1',
            fixed: '1'
          },
          sourcePaysForDest: true
        },
        lockTime: '' + moment().add(20, 's').format('X'),
        details: {
          name: 'swap',
          description: 'Some stuff'
        },
        secretHash: secretHash,
        source: payer.accountId
      },
      payer.accountKp
    )
    log.info(`Created swap, id ${swapId}`)

    await swapHelper.mustLoadEnded(swapId)

    await swapHelper.close(swapId, undefined, payer.accountKp)

    await swapHelper.mustLoadCancelled(swapId)
  })

  it('should create swap, wait till it\'s ended and cancel by admin', async () => {
    const log = logger.new('swaps')

    const assetCode = Asset.randomCode('BASE')
    await Promise.all([
      createAndApproveAsset({
        code: assetCode,
        policies: 130,
      }),
    ])
    log.info(`Created asset, code: ${assetCode}`)

    let amount = '1000'
    const payer = await createFundedGeneral({
      [assetCode]: amount,
    })
    log.info(`Created the swap creator account, id: ${payer.accountId}`)

    const receiver = Keypair.random()
    await accountHelper.createSyndicate(receiver.accountId())
    log.info(`Created the receiver account, id: ${receiver.accountId()}`)

    let sourceBalance = await balanceHelper.mustLoad(payer.accountId, assetCode)
    log.info(`Loaded source balance ${sourceBalance.balanceId}`)

    let secret = nacl.randomBytes(32)
    let secretHash = hash(secret).toString('hex')

    let swapId = await swapHelper.create({
        destination: receiver.accountId(),
        sourceBalance: sourceBalance.balanceId,
        amount: '100.0',
        feeData: {
          sourceFee: {
            percent: '1',
            fixed: '1'
          },
          destinationFee: {
            percent: '1',
            fixed: '1'
          },
          sourcePaysForDest: true
        },
        lockTime: '' + moment().add(20, 's').format('X'),
        details: {
          name: 'swap',
          description: 'Some stuff'
        },
        secretHash: secretHash,
        source: payer.accountId
      },
      payer.accountKp
    )
    log.info(`Created swap, id ${swapId}`)

    await swapHelper.mustLoadEnded(swapId)

    await swapHelper.close(swapId)

    await swapHelper.mustLoadCancelled(swapId)
  })

})
