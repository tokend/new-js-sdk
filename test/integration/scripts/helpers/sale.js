import {isUndefined} from 'util';
import { base } from '../../../../src'

var reviewableRequestHelper = require('./review_request')

function createSaleCreationRequest(testHelper, owner, baseAsset, defaultQuoteAsset, startTime, endTime, softCap, hardCap, quoteAssets, saleType, baseAssetForHardCap, saleState) {
    if (isUndefined(saleState)) {
        saleState = base.xdr.SaleState.none();
    }
    let opts = {
        requestID: "0",
        baseAsset: baseAsset,
        defaultQuoteAsset: defaultQuoteAsset,
        name: baseAsset + defaultQuoteAsset,
        startTime: startTime,
        endTime: endTime,
        softCap: softCap,
        hardCap: hardCap,
        quoteAssets: quoteAssets,
        saleType: saleType,
        baseAssetForHardCap: baseAssetForHardCap,
        saleState: saleState,
        details: {
            short_description: "short description",
            description: "Token sale description",
            logo: {
                url: "logo_url",
                type: "logo_type",
            },
            name: "sale name",
        },
    };
    let operation = base.SaleRequestBuilder.createSaleCreationRequest(opts);
    return testHelper.sdk.horizon.transactions.submitOperations(operation);
}

function createAndReviewSale(testHelper, owner, baseAsset, defaultQuoteAsset, startTime, endTime, softCap, hardCap,
                             quoteAssets, saleType, baseAssetForHardCap, saleState) {
    return createSaleCreationRequest(testHelper, owner, baseAsset, defaultQuoteAsset, startTime, endTime, softCap,
        hardCap, quoteAssets, saleType, baseAssetForHardCap, saleState)
        .then(response => {
            var result = base.xdr.TransactionResult.fromXDR(new Buffer(response.result_xdr, "base64"));
            var success = result.result().results()[0].tr().createSaleCreationRequestResult().success();
            var id = success.requestId().toString();
            return reviewableRequestHelper.reviewRequest(testHelper, id, testHelper.master, base.xdr.ReviewRequestOpAction.approve().value, "");
        }).then(res => {
            console.log(baseAsset, defaultQuoteAsset, ' <-- Sale successfully created');
            return res;
        })
        .then(response => {
            let result = base.xdr.TransactionResult.fromXDR(new Buffer(response.result_xdr, "base64"));
            let saleID = result.result().results()[0].tr().reviewRequestResult().success().ext().extendedResult().typeExt().saleExtended().saleId().toString();
            console.log("SaleID: " + saleID);
            return saleID;
        });
}

function createSale(testHelper, owner, baseAsset, defaultQuoteAsset, startTime, endTime, softCap, hardCap,
                    quoteAssets, saleType, baseAssetForHardCap, saleState) {
    return createSaleCreationRequest(testHelper, owner, baseAsset, defaultQuoteAsset, startTime, endTime, softCap,
        hardCap, quoteAssets, saleType, baseAssetForHardCap, saleState)
        .then(response => {
            var result = base.xdr.TransactionResult.fromXDR(new Buffer(response.result_xdr, "base64"));
            var success = result.result().results()[0].tr().createSaleCreationRequestResult().success();
            return success.requestId().toString();
        });
}

function cancelSaleCreationRequest(testHelper, owner, requestID) {
    let opts = {
        requestID: requestID,
    };
    let operation = base.SaleRequestBuilder.cancelSaleCreationRequest(opts);
    return testHelper.sdk.horizon.transactions.submitOperations(operation);
}

function createPromotionUpdateRequest(testHelper, owner, saleID, baseAsset, defaultQuoteAsset,
                                      startTime, endTime, softCap, hardCap, quoteAssets, saleType,
                                      baseAssetForHardCap, saleState, requestID = "0") {
    let opts = {
        saleID: saleID,
        requestID: requestID,
        baseAsset: baseAsset,
        defaultQuoteAsset: defaultQuoteAsset,
        name: baseAsset + defaultQuoteAsset,
        startTime: startTime,
        endTime: endTime,
        softCap: softCap,
        hardCap: hardCap,
        quoteAssets: quoteAssets,
        saleType: saleType,
        baseAssetForHardCap: baseAssetForHardCap,
        saleState: saleState,
        details: {
            short_description: "short description",
            description: "Token sale description",
            logo: {
                url: "logo_url",
                type: "logo_type",
            },
            name: "sale name",
        },
    };

    let operation = base.ManageSaleBuilder.createPromotionUpdateRequest(opts);
    return testHelper.sdk.horizon.transactions.submitOperations(operation)
        .then(response => {
            let result = base.xdr.TransactionResult.fromXDR(new Buffer(response.result_xdr, "base64"));
            let id = result.result().results()[0].tr().manageSaleResult().success().response().promotionUpdateRequestId().toString();
            console.log("PromotionUpdateRequest created: " + id);
            return id;
        });
}

function checkSaleState(testHelper, baseAsset) {
    return testHelper.server.sales().forBaseAsset(baseAsset).callWithSignature(testHelper.master).then(sales => {
        return sales.records[0];
    }).then(sale => {
        let operation = base.SaleRequestBuilder.checkSaleState({saleID: sale.id});
        return testHelper.sdk.horizon.transactions.submitOperations(operation);
    }).then(response => {
        return response;
    });
}

function setSaleState(testHelper, saleID, state) {
    let opts = {
        saleID: saleID,
        saleState: state,
    };

    let operation = base.ManageSaleBuilder.setSaleState(opts);
    return testHelper.sdk.horizon.transactions.submitOperations(operation);
}

function createUpdateSaleDetailsRequest(testHelper, owner, saleID) {
    let opts = {
        requestID: "0",
        saleID: saleID,
        newDetails: {
            short_description: "updated short description",
            description: "Token sale description",
            logo: {
                url: "logo_url",
                type: "logo_type",
            },
            name: "updated sale name",
        },
    };

    let operation = base.ManageSaleBuilder.createUpdateSaleDetailsRequest(opts);
    return testHelper.sdk.horizon.transactions.submitOperations(operation)
        .then(response => {
            let result = base.xdr.TransactionResult.fromXDR(new Buffer(response.result_xdr, "base64"));
            let id = result.result().results()[0].tr().manageSaleResult().success().response().requestId().toString();
            console.log("UpdateSaleDetailsRequest created: " + id);
            return id;
        });
}

function createUpdateSaleEndTimeRequest(testHelper, owner, saleID, newEndTime) {
    let opts = {
        requestID: '0',
        saleID: saleID,
        newEndTime: newEndTime,
    };

    let operation = base.ManageSaleBuilder.createUpdateSaleEndTimeRequest(opts);
    return testHelper.sdk.horizon.transactions.submitOperations(operation)
        .then(response => {
            let result = base.xdr.TransactionResult.fromXDR(new Buffer(response.result_xdr, "base64"));
            let id = result.result().results()[0].tr().manageSaleResult().success().response().updateEndTimeRequestId().toString();
            console.log("UpdateSaleEndTimeRequest created: " + id);
            return id;
        });
}

function cancelSale(testHelper, owner, saleID) {
    let opts = {
        saleID: saleID,
    };
    let operation = base.ManageSaleBuilder.cancelSale(opts);
    return testHelper.sdk.horizon.transactions.submitOperations(operation);
}

module.exports = {
    createSaleCreationRequest,
    createAndReviewSale,
    createSale,
    cancelSaleCreationRequest,
    checkSaleState,
    createUpdateSaleDetailsRequest,
    cancelSale,
    setSaleState,
    createUpdateSaleEndTimeRequest,
    createPromotionUpdateRequest
};