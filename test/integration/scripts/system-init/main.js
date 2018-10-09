const helpers = require('./../helpers');
const operations = require('./operations');

Promise.resolve()
    .then(_ => {
        return Promise.all(operations.createAssets());
    })
    .then(_ => {
        console.log('Assets created')
        return Promise.all(operations.createAssetPairs())})
    .then(_ => {
        console.log('Asset pairs created')
        return Promise.all(operations.preEmitCoins())})
    .then(_ => {
        console.log('Coins pre-emitted')
        return Promise.all(operations.createAccount())})
    .then(_ => {
        console.log('Accounts created')
        return Promise.all(operations.issueTokens())})
    .then(_ => {
        console.log('Tokens Issued')
        return Promise.all(operations.addAdmins())})
    .then(_ => {
        console.log('Admins added')
        return operations.setThresholds()
    })
    .then(_ => {
        console.log("thresholds set")
    })
    .catch(helpers.errorHandler);
