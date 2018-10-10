import { base } from '../../../../src'

function billPay(testHelper, sourceKP, sourceBalanceID, destination, amount, sourceFeeAsset, destFeeAsset,
                 sourcePaysForDest, requestId) {
    let opts = {
        requestId: requestId,
        sourceBalanceId: sourceBalanceID,
        destination: destination,
        amount: amount,
        feeData: {
            sourceFee: {
                maxPaymentFee: "50",
                fixedFee: "10",
                feeAsset: sourceFeeAsset,
            },
            destinationFee: {
                maxPaymentFee: "5",
                fixedFee: "5",
                feeAsset: destFeeAsset,
            },
            sourcePaysForDest: sourcePaysForDest,
        },
        subject: "Payment V2 test",
        reference: "",
    };

    let op = base.BillPayBuilder.billPay(opts);
    return testHelper.sdk.horizon.transactions.submitOperations(op);
}

module.exports = {
    billPay
};