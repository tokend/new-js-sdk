import {Keypair} from "../../src/base";
import {Wallet} from "../../src/wallet";
import {ApiCaller} from "../../src/api2";
import * as config from "../config";
import {
  api,
  assetHelper,
  assetPairHelper,
  balanceHelper,
  changeRoleHelper,
  keyValueHelper,
  requestHelper,
  saleHelper
} from "../helpers";
import {logger} from "../logger";
import {Asset} from "../helpers/asset";
import {createAndApproveAsset} from "../scripts/create_asset";
import {ASSET_PAIR_POLICIES} from "../../src/const";
import {fundMasterAccount} from "../scripts/create_account";
import {constructPayment, createPaymentFromOpts} from "../scripts/create_payment";

describe.only('algalon_songman_tests', async () => {
  const log = logger.new('algalon')

  const systemAsset = 'RUB'
  const labelAccount = Keypair.fromSecret('SCI3MA6V7UB74HVS2AT2Q3VONAGG53VOCXXI74GABKTHAK6X5TXETEDN')
  const serviceAccount = Keypair.fromSecret('SC323IG53ETX6M4H5IMLOJZG7CD6AZLFQMDCTKERWI2J7DAK3BFWNF5J')

  const wallet = new Wallet('foo@bar.baz', labelAccount, labelAccount.accountId(), 'fooWalletID', 'fooSessID', 'fooSessKey')
  let apiWithLabelSign = ApiCaller.getInstance(config.api_url)
  apiWithLabelSign.useWallet(wallet)

  it('should issue to master account enough money to work with labels', async () => {
    const systemAssetInfo = await assetHelper.mustLoad(systemAsset)

    let amount = Math.floor(parseFloat(systemAssetInfo.availableForIssuance) / 2)
    if (amount >= 100000) { // let's say that less amount wouldn't be enough for all stuff
      await Promise.all([
        fundMasterAccount(systemAssetInfo.code, `${amount}`),
      ])
    }
  });

  it('should change role of the account to label', async () => {
    let roleToSetKey = 'account_role:label'
    const roleToSet = await keyValueHelper.getEntryValue(roleToSetKey)

    let kycData = {
      name: 'CBS Records'
    }

    let createBlob = async (blobType, data, owner) => {
      console.log('owner ' + owner.accountId())
      const {data: blob} = await apiWithLabelSign.postWithSignature('/blobs', {
        data: {
          type: blobType,
          attributes: {value: JSON.stringify(data)},
          relationships: {
            owner: {data: {id: owner.accountId()}},
          },
        },
      });
      return blob.id
    }

    let creatorDetails = {
      blob_id: await createBlob("kyc_form", kycData, labelAccount)
    }

    log.info(`created blob, id ${creatorDetails.blob_id}`)

    let requestId = await changeRoleHelper.create({
      destinationAccount: labelAccount.accountId(),
      accountRoleToSet: `${roleToSet}`,
      creatorDetails: creatorDetails
    }, labelAccount)

    log.info(`created change role request, id ${requestId}`)

    await requestHelper.approve(requestId, {
      tasksToRemove: 1
    })
  });

  it(`should create genre and artist for label ${labelAccount.accountId()}`, async () => {
    let genreName = Asset.randomCode('pop_')
    log.info(`randomized the name for genre: ${genreName}`)

    await api.postWithSignature('/integrations/songman/genres', {
      data: {
        attributes: {
          name: genreName,
          details: {
            description: 'Pop music dummy'
          }
        }
      }
    });

    log.info(`created genre`)

    let artistName = Asset.randomCode('wham_')
    log.info(`tryna create artist, name ${artistName}`)

    const {data: artist} = await apiWithLabelSign.postWithSignature(`/integrations/songman/labels/${labelAccount.accountId()}/artists`, {
      data: {
        attributes: {
          name: artistName,
          details: {
            year: `${1950 + Math.floor(70 * Math.random())}`,
          }
        }
      }
    })
    log.info(`created artist, id: ${artist.id}`)

    let musicObjectTypes = {
      album: {
        name: 'album',
        value: 1,
      },
      single: {
        name: 'single',
        value: 2,
      },
      compilation: {
        name: 'compilation',
        value: 3,
      }
    }

    const assetTypeDefault = '0'

    const musicObjectName = 'last_christmas'
    const assetCode = Asset.randomCode('SONG')

    await Promise.all([
      createAndApproveAsset({
        assetType: assetTypeDefault,
        code: assetCode,
        creatorDetails: {
          type: musicObjectTypes.album,
          name: musicObjectName,
          released: `1984`,
          genre_name: genreName,
          artist_id: Number.parseInt(artist.id, 10),
        },
      }, labelAccount),
    ])
    log.info(`Created music object, code: ${assetCode}`)

    await assetPairHelper.create({
      base: assetCode,
      quote: systemAsset,
      physicalPrice: `10`,
      policies: ASSET_PAIR_POLICIES.tradeableSecondaryMarket
    })
    log.info(`Created tradeable asset pair, base: ${systemAsset}, quote: ${assetCode}`)

    let amount = Math.floor(10 + 100 * Math.random())
    await saleHelper.create({
      baseAsset: assetCode,
      quoteAssets: [{asset: systemAsset, price: '100'}],
      defaultQuoteAsset: systemAsset,
      requiredBaseAssetForHardCap: `${amount}`
    }, labelAccount)
    log.info(`Created sale of ${assetCode} of amount ${amount}, `)
  });

  it.only('should send initiate royalty payment request to service', async () => {
    let getNonZeroBalances = async (assetCode) => {
      const balances = await balanceHelper.mustLoadAllForAsset(assetCode)
      const balanceOwners = balances.map(b => b.accountId)

      return await Promise.all(balanceOwners.map(async owner => {
        return await balanceHelper.mustLoad(owner, assetCode)
      }))
    }

    let saleID = `2` // TODO change on demand
    const sale = await saleHelper.mustLoadById(saleID)

    if (sale.state.name !== 'closed') { // 2 == closed
      log.info(`sale ${saleID} is currently ${sale.state.name}`)
      return
    }

    const saleAsset = sale.baseAsset
    const investorsBalances = (await getNonZeroBalances(saleAsset)).filter(b => b.accountId !== sale.ownerId)

    const investorsCount = investorsBalances.length
    const royaltyAmount = `${investorsCount * 1000}`

    const master = assetHelper.masterKp

    let requests = []
    for(let i = 0; i < 100; i++) {
      const payment = await constructPayment(master, serviceAccount, systemAsset, royaltyAmount)

      const response = await Promise.all([
        createPaymentFromOpts(payment)
      ])
      log.info(`Payment from ${master} to ${serviceAccount.accountId()} with ${royaltyAmount} of ${systemAsset} successful`)


      expect(response.length).to.be.equal(1)
      let env = response[0].envelopeXdr

      requests.push({
        data: {
          attributes: {
            tx: `${env}`
          }
        }
      })
    }

    log.info("requests created, now bang bang bang")

    await Promise.all(requests.map(async requestBody => await api.postWithSignature(`/integrations/royalty/${saleID}/pay`, requestBody)))
  });
});
