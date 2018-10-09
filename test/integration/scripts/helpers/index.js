const assets = require('./asset')
const accounts = require('./accounts')
const fees = require('./fees')
const issuance = require('./issuance')
const withdraw = require('./withdraw')
const sale = require('./sale')
const offer = require('./offer')
const payout = require('./payout');
const tx = require('./transactions')
const delay = require('./delay')

function errorHandler(error) {
    console.info('Operation failed', error);
    if (error.response) {
        console.info('with status', error.response.status);
        console.info('ERROR -------------------->>>');
        console.info(JSON.stringify(error.response.data, null, 2));
        console.info('<<<--------------------------');
    } else {
        console.info('ERROR -------------------->>>');
        console.info('with error', JSON.stringify(error, null, 2));
        console.info('<<<--------------------------');
    }
}

module.exports = {
    assets,
    accounts,
    fees,
    issuance,
    errorHandler,
    createWithdrawRequest: withdraw,
    sale,
    offer,
    payout,
    tx,
    delay
}