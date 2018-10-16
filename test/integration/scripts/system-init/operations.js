import { base } from '../../../../src'

const config = require('../config')
const helpers = require('./../helpers')
const _ = require('lodash');

let env = 'local';
let currentConfig = config.getConfig(env);

const accounts = [
    {
        email: 'alice@mail.com',
        accountId: 'GABEAZ4VBERMJY5PAEMOP7AS2VFCRAKXB3J3A3IHZ25DIZFSWG2S4AE6',
        policy: 0,
        accountType: base.xdr.AccountType.notVerified().value
    },
    {
        email: 'bob@mail.com',
        accountId: 'GDJIZI4U67IZPWV26PYMPSIQTVTZAUDDID5PLA7W54ZKW6TEB664UQZT',
        policy: 0,
        accountType: base.xdr.AccountType.notVerified().value
    },
    {
        email: 'john@mail.com',
        accountId: 'GDS67HI27XJIJEL7IGHVJVNHPXZLMW6F3O45OXIMKAUNGIR2ROBUKTT4',
        policy: 0,
        accountType: base.xdr.AccountType.notVerified().value
    },
]

const baseAssetPolicy = base.xdr.AssetPolicy.baseAsset().value | base.xdr.AssetPolicy.withdrawable().value | base.xdr.AssetPolicy.twoStepWithdrawal().value;

const tokensForIssuance = [
    {code: 'SUN', policy: 0, maxAmount: "0", amount: "0", emit: "0", issuer: "GBKCQ3JTQI652LHNB3YRR75K3CXQFQ77T7MOMG47NJ6PREIVJ26VWU6L"},
    {code: 'BTC', policy: baseAssetPolicy, maxAmount: "9223372036854.775807", amount: '0', emit: '0', issuer: "GBKCQ3JTQI652LHNB3YRR75K3CXQFQ77T7MOMG47NJ6PREIVJ26VWU6L"},
    {code: 'ETH', policy: baseAssetPolicy, maxAmount: "9223372036854.775807", amount: '0', emit: '0', issuer: "GBKCQ3JTQI652LHNB3YRR75K3CXQFQ77T7MOMG47NJ6PREIVJ26VWU6L"},
]

const assetPairs = [
    {base: 'BTC', quote: 'SUN', policy: 0, price: "11583.44"},
    {base: 'ETH', quote: 'SUN', policy: 0, price: "1228.77"},
]

module.exports = {
    createAssets: () => {
        return tokensForIssuance.map(asset =>
            helpers.assets.createAsset(currentConfig, currentConfig.master, asset.issuer, asset.code, asset.policy, asset.maxAmount)
        )
    },

    createAssetPairs: () => {
        return assetPairs.map(pair => helpers.assets.createAssetPair(currentConfig, pair.base, pair.quote, pair.price))
    },

    preEmitCoins: () => {
        return tokensForIssuance.map(asset => {
            if (asset.maxAmount === "0") {
                return Promise.resolve()
            }
            return helpers.issuance.performPreIssuance(currentConfig, currentConfig.master, currentConfig.master, asset.code, asset.amount)
        })
    },

    createAccount: () => {
        return accounts.map(a => helpers.accounts.createNewAccount(currentConfig, a.accountId, a.accountType, a.policy))
    },

    issueTokens: () => {
        return accounts.map(a => {
            return tokensForIssuance.map(asset => {
                if (asset.maxAmount === "0") {
                    return Promise.resolve()
                }
                return helpers.accounts.loadBalanceIDForAsset(currentConfig, a.accountId, asset.code)
                    .then(bId => helpers.issuance.issue(currentConfig, currentConfig.master, bId, asset.code, asset.emit))
            })
        })
    },

    addAdmins: () => {
        return _.map(currentConfig.admins, (details, address) =>
            helpers.accounts.addSuperAdmin(
                currentConfig, currentConfig.master.accountId(), currentConfig.master, address, details
            )
        )
    },

    setThresholds: () => helpers.accounts.setThresholds(currentConfig, currentConfig.master.accountId(), currentConfig.master, currentConfig.thresholds)

}

