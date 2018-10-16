import { base } from '../../../../src'

function createNewAccount(testHelper, accountId, accountType, accountPolicies = undefined, referrer = undefined) {
    let recoverKP = base.Keypair.random();
    const opts = {
        destination: accountId,
        recoveryKey: recoverKP.accountId(),
        accountType: accountType,
        referrer: referrer,
        source: testHelper.master.accountId(),
        accountPolicies: accountPolicies,
        recoveryKey: base.Keypair.random().accountId(),
    };
    const operation = base.Operation.createAccount(opts);

    return testHelper.sdk.horizon.transactions.submitOperations(operation)
        .then(res => {
            console.log('Account created: ', accountId)
            return res
        })
}

function createBalanceForAsset(testHelper, sourceKP, assetCode) {
    let opts = {
        destination: sourceKP.accountId(),
        action: base.xdr.ManageBalanceAction.create(),
        asset: assetCode,
    };
    const operation = base.Operation.manageBalance(opts);
    return testHelper.sdk.horizon.transactions.submitOperations(operation)
        .then(res => {
            console.log('Balance created for ', sourceKP.accountId())
            return res
        })
}

function findBalanceByAsset(balances, asset) {
    for (var i = 0; i < balances.length; i++) {
        if (balances[i].asset === asset) {
            return balances[i]
        }
    }

    throw new Error("Failed to find balance for asset: " + asset);
}

function isExternalSystemAccountIDAlreadyExists(tesstHelper, accountId, externalSystemType) {
    return testHelper.server.loadAccountWithSign(accountId, testHelper.master).then(source => {
        for (var i in source.external_system_accounts) {
            var id = source.external_system_accounts[i];
            if (id.type.value === externalSystemType) {
                return true;
            }
        }

        return false;
    }).catch(err => {
        if (!isUndefined(err.response) && err.response.status === 404) {
            return false;
        }
        throw err;
    });
}

function loadBalanceForAsset(testHelper, accountId, asset) {
    return testHelper.server.loadAccountWithSign(accountId, testHelper.master)
        .then(source => {
            return findBalanceByAsset(source.balances, asset)
        });
}

function loadBalanceIDForAsset(testHelper, accountId, asset) {
    return loadBalanceForAsset(testHelper, accountId, asset).then(balance => {
        return balance.balance_id;
    })
}


function addSuperAdmin(testHelper, sourceAccId, keypair, address, details) {
    console.log("Add SuperAdmin: ", address)
    var source = new base.Account(sourceAccId)
    var tx = new base.TransactionBuilder(source)
        .addOperation(base.SetOptionsBuilder.setOptions({
            signer: {
                pubKey: address,
                weight: details.weight,
                signerType: details.type,
                identity: `${details.identity}`,
                name: details.name,
            }
        }))
        .build();

    tx.sign(keypair);
    return testHelper.sdk.horizon.transactions.submit(tx)
}

function setThresholds(helper, source, kp, thresholds) {
    var tx = new base.TransactionBuilder(new base.Account(source))
        .addOperation(base.SetOptionsBuilder.setOptions({
            masterWeight: thresholds.master || undefined,
            highThreshold: thresholds.high || undefined,
            mediumThreshold: thresholds.medium || undefined,
            lowThreshold: thresholds.low || undefined,
        }))
        .build();

    tx.sign(kp);
    return helper.sdk.horizon.transactions.submit(tx)
}

module.exports = {
    createNewAccount,
    createBalanceForAsset,
    loadBalanceForAsset,
    loadBalanceIDForAsset,
    addSuperAdmin,
    setThresholds,
}
