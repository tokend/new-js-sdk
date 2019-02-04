require('@babel/register')

const { base, TokenD, Wallet } = require('../src')
const { NotFoundError } = require('../src/errors')

const config = Object.freeze({
  MASTER_SEED: 'SAMJKTZVW5UOHCDK5INYJNORF2HRKYI72M5XSZCBYAHQHR34FFR4Z6G4',
  MASTER_PK: 'GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB',
  SALES_NEEDED: 45,
  SERVER_URL: 'http://localhost:8001',
  ISSUANCE_AMOUNT: '1250.000000',
  POLICY: 0
})

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const requests = []
for (let i = 0; i < config.SALES_NEEDED; i++) {
  requests.push(initSales())
}

Promise.all(requests)

async function initSales () {
  let sdk
  try {
    sdk = await TokenD.create(config.SERVER_URL, {
      allowHttp: true
    })
    sdk.useWallet(new Wallet(
      '',
      config.MASTER_SEED,
      config.MASTER_PK,
      ''
    ))
  } catch (e) {
    console.error('Failed to initialize sdk')
    console.error(e)
    return
  }

  try {
    const code = ('' + Math.floor(Math.random() * 1000000000)).replace('.', '')
    console.log(code.length)
    console.log('creating token')
    await createToken(sdk, code)
    console.log('token created')
    const txResponseV2 = await createSale(sdk, code)
    console.log('sale created')
    const idV2 = deriveRequestId(txResponseV2, 'createSaleCreationRequestResult')
    console.log('got request ID: ' + idV2)
    const requestV2 = await loadRequest(sdk, idV2)
    await approveRequest(sdk, requestV2)
    console.log('sale request approved')
  } catch (e) {
    console.error(e)
    console.error(e.meta.extras.resultCodes)
    console.error('Failed to run init script')
    return
  }
}

function deriveRequestId (response, resultType) {
  return base
    .xdr
    .TransactionResult.fromXDR(new Buffer(response.resultXdr, 'base64'))
    .result()
    .results()[0]
    .tr()
    [resultType]()
    .success()
    .requestId()
    .toString()
}

async function createToken (sdk, code) {
  console.log('inside create token')
  const operation = base
    .ManageAssetBuilder
    .assetCreationRequest({
      requestID: '0',
      code,
      preissuedAssetSigner: config.MASTER_PK,
      maxIssuanceAmount: config.ISSUANCE_AMOUNT,
      policies: config.POLICY,
      initialPreissuedAmount: config.ISSUANCE_AMOUNT,
      allTasks: 1,
      details: {}
    })
  console.log('operation crafted')

  const response = await sdk
    .horizon
    .transactions
    .submitOperations(operation)

  return response.data
}

async function loadRequest (sdk, id) {
  try {
    const request = await sdk.horizon.request.get(id)
    return request.data
  } catch (e) {
    if (e instanceof NotFoundError) {
      return loadRequest(sdk, id)
    }
    throw e
  }
}

async function approveRequest (sdk, request, tasksToRemove = 1) {
  await delay(5000)
  const operation = base.ReviewRequestBuilder.reviewRequest({
    requestID: request.id,
    requestHash: request.hash,
    requestType: request.details.requestTypeI,
    action: base.xdr.ReviewRequestOpAction.approve().value,
    reason: '',
    reviewDetails: {
      tasksToAdd: 0,
      tasksToRemove: tasksToRemove,
      externalDetails: ''
    }

  })

  const response = await sdk
    .horizon
    .transactions
    .submitOperations(operation)

  return response.data
}

async function createSale (sdk, code) {
  const operation = base
    .SaleRequestBuilder
    .createSaleCreationRequest({
      requestID: "0",
      baseAsset: code,
      defaultQuoteAsset: 'USD',
      name: code + '-USD',
      startTime: Math.floor(Date.now() / 1000) + '',
      endTime: Math.floor(Date.now() / 1000 + 259200) + '',
      softCap: '10000',
      hardCap: '20000',
      allTasks: 1,
      quoteAssets: [
        {
          price: '1',
          asset: 'BTC'
        },
        {
          price: '1',
          asset: 'ETH'
        }
      ],
      isCrowdfunding: true,
      requiredBaseAssetForHardCap: '10000',
      saleState: base.xdr.SaleState.none(),
      details: {
        name: code + ' sale',
        short_description: code + 'reqweqweq',
        description: code + 'eqwewerwqr',
        logo: {}
      }
    })

  const response = await sdk
    .horizon
    .transactions
    .submitOperations(operation)

  return response.data
}

function reviewSale (sdk, code) {

}
