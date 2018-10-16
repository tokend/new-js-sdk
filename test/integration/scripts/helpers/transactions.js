const isUndefined = require('lodash/isUndefined');
const delay = require('./delay').delay;

function waitForTX(testHelper, txhash) {
    return testHelper.server
        .transactions()
        .transaction(txhash)
        .call()
        .catch(err => {
            if (!isUndefined(err.response) && err.response.status === 404) {
                console.log("received 404 for tx - retrying");
                return delay(2000).then(() => waitForTX(testHelper, txhash));
            }
            throw err;
    });

}

module.exports = {
    waitForTX
};
