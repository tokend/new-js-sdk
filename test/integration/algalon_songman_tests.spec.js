import {Keypair} from "../../src/base";
import {Wallet} from "../../src/wallet";
import {ApiCaller} from "../../src/api2";
import * as config from "../config";
import {changeRoleHelper, requestHelper, api, keyValueHelper, assetPairHelper} from "../helpers";
import {logger} from "../logger";
import {Asset} from "../helpers/asset";
import {createAndApproveAsset} from "../scripts/create_asset";
import {ASSET_PAIR_POLICIES} from "../../src/const";

describe.only('algalon_songman_tests', async () => {
  const log = logger.new('algalon')
  let account = Keypair.fromSecret('SASW37POW3HF37YAAROTT6DBYZM4DUOLI4F5FKPZVQ2XIO35PWZDFHUC')

  const wallet = new Wallet('foo@bar.baz', account, account.accountId(), 'fooWalletID', 'fooSessID', 'fooSessKey')
  let apiWithLabelSign = ApiCaller.getInstance(config.api_url)
  apiWithLabelSign.useWallet(wallet)

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
      blob_id: await createBlob("kyc_form", kycData, account)
    }

    log.info(`created blob, id ${creatorDetails.blob_id}`)

    let requestId = await changeRoleHelper.create({
      destinationAccount: account.accountId(),
      accountRoleToSet: `${roleToSet}`,
      creatorDetails: creatorDetails
    }, account)

    log.info(`created change role request, id ${requestId}`)

    await requestHelper.approve(requestId, {
      tasksToRemove: 1
    })
  });

  it.only(`should create genre and artist for label ${account.accountId()}`, async () => {
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

    const {data: artist} = await apiWithLabelSign.postWithSignature(`/integrations/songman/labels/${account.accountId()}/artists`, {
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

    let systemAsset = 'RUB'

    for (let i = 1; i <= 5; i++) {
      const musicObjectName = Asset.randomCode('last_christmas_')
      const assetCode = Asset.randomCode('SONG')

      await Promise.all([
        createAndApproveAsset({
          code: assetCode,
          creatorDetails: {
            type: musicObjectTypes.album,
            name: musicObjectName,
            released: `1984`,
            genre_name: genreName,
            artist_id: Number.parseInt(artist.id, 10),
          }
        }),
      ], account)
      log.info(`Created music object, code: ${assetCode}`)

      await assetPairHelper.create({
        base: systemAsset,
        quote: assetCode,
        physicalPrice: `${i}`,
        policies: ASSET_PAIR_POLICIES.tradeableSecondaryMarket
      })
      log.info(`Created tradeable asset pair, base: ${systemAsset}, quote: ${assetCode}`)

    }
  });
});
