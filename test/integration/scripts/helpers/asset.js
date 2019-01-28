import { base } from '../../../../src'

var reviewableRequestHelper = require('./review_request')

function createAssetCreationRequest(testHelper, owner, issuer, assetCode, policy = 0, maxIssuanceAmount = "100000000", initialPreissuedAmount = "0") {
    console.log(assetCode, maxIssuanceAmount)
    let opts = {
        requestID: "0",
        code: assetCode,
        preissuedAssetSigner: issuer,
        maxIssuanceAmount: maxIssuanceAmount,
        trailingDigitsCount: 0,
        policies: policy,
        initialPreissuedAmount: initialPreissuedAmount,
        details: {
            name: assetCode + " name",
            documents: ["asd1", "asd2"],
            logo: {
                url: "logo_url",
                type: "logo_type",
            },
        },

    };
    let operation = base.ManageAssetBuilder.assetCreationRequest(opts);
    return testHelper.sdk.horizon.transactions.submitOperations(operation);
}

function createAssetUpdateRequest(testHelper, owner, issuer, assetCode, policy = 0) {
    let opts = {
        requestID: "0",
        code: assetCode,
        policies: policy,
        details: {
            name: assetCode + " name",
            documents: ["asd1", "asd2"],
            logo: {
                url: "logo_url",
                type: "logo_type",
            },
        },

    };
    let operation = base.ManageAssetBuilder.assetUpdateRequest(opts);
    return testHelper.sdk.horizon.transactions.submitOperations(operation);
}

function createAsset(testHelper, owner, issuer, assetCode, policy, maxIssuanceAmount, initialPreissuedAmount = "0") {
    return createAssetCreationRequest(testHelper, owner, issuer, assetCode, policy, maxIssuanceAmount, initialPreissuedAmount)
        .then(response => {
            var result = base.xdr.TransactionResult.fromXDR(new Buffer(response.result_xdr, "base64"));
            var success = result.result().results()[0].tr().manageAssetResult().success()
            if (success.fulfilled() === true) {
                return 'Asset created'
            }
            var id = success.requestId().toString();
            return reviewableRequestHelper.reviewRequest(testHelper, id, testHelper.master, base.xdr.ReviewRequestOpAction.approve().value, "");
        }).then(res => {
            console.log(assetCode, ' <-- Asset successfully created');
            return res;
        });
}

function updateAsset(testHelper, owner, issuer, assetCode, policy) {
    return createAssetUpdateRequest(testHelper, owner, issuer, assetCode, policy)
        .then(response => {
            var result = base.xdr.TransactionResult.fromXDR(new Buffer(response.result_xdr, "base64"));
            var success = result.result().results()[0].tr().manageAssetResult().success()
            if (success.fulfilled() === true) {
                return 'Asset updated'
            }
            var id = success.requestId().toString();
            return reviewableRequestHelper.reviewRequest(testHelper, id, testHelper.master, base.xdr.ReviewRequestOpAction.approve().value, "");
        }).then(res => {
            console.log(assetCode, ' <-- Asset successfully updated');
            return res;
        });
}

function createAssetPair(testHelper, baseAsset, quoteAsset, physicalPrice = "1", policies = 0) {
    let operation = base.Operation.manageAssetPair({
        action: base.xdr.ManageAssetPairAction.create(),
        base: baseAsset,
        quote: quoteAsset,
        policies: policies,
        physicalPriceCorrection: "0",
        maxPriceStep: "0",
        physicalPrice: physicalPrice,
    });
    return testHelper.sdk.horizon.transactions.submitOperations(operation);
}


function changePreIssuerSigner(testHelper, code, newPreIssuer, owner, preIssuerKP) {
    let operation = base.ManageAssetBuilder.changeAssetPreIssuer({
        code: code,
        accountID: newPreIssuer,
    });
    return testHelper.sdk.horizon.transactions.submitOperations(operation);
}

function updateAssetPrice(testHelper, baseAsset, quoteAsset, physicalPrice = "1") {
    let operation = base.Operation.manageAssetPair({
        action: base.xdr.ManageAssetPairAction.updatePrice(),
        base: baseAsset,
        quote: quoteAsset,
        policies: 0,
        physicalPriceCorrection: "0",
        maxPriceStep: "0",
        physicalPrice: physicalPrice,
    });
    return testHelper.sdk.horizon.transactions.submitOperations(operation);
}

module.exports = {
    createAssetCreationRequest,
    createAsset,
    updateAsset,
    createAssetPair,
    updateAssetPrice,
    changePreIssuerSigner
}
