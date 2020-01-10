import {Keypair} from "../../src/base";
import {Wallet} from "../../src/wallet";
import {ApiCaller} from "../../src/api2";
import * as config from "../config";
import {changeRoleHelper, requestHelper, api, keyValueHelper, accountHelper} from "../helpers";
import {logger} from "../logger";
import {Asset} from "../helpers/asset";
import {createAndApproveAsset} from "../scripts/create_asset";

describe.only('algalon_songman_tests', async () => {
  const log = logger.new('algalon')
  let account = Keypair.fromSecret('SBVZCILZOUITL4T7C624U2V5KHY2IN4WFNXKEAWQ5B7KR2WRX4CDGH44')

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
    log.info(`tryna to create artist, name ${artistName}`)

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

    for (let i = 0; i < 5; i++) {
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
    }
  });
});
