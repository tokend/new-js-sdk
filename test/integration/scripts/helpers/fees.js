function setFees(testHelper, feeType, fixedFee, percentFee, asset = baseAsset, subtype = '0', isDelete = false, feeAsset = undefined) {
    return testHelper.server.loadAccountWithSign(testHelper.master.accountId(), testHelper.master)
        .then(source => {
            let opts = {
                fee: {
                    feeType,
                    asset,
                    fixedFee,
                    percentFee,
                    subtype: subtype,
                    upperBound: "10000000",
                    feeAsset: feeAsset,
                },
                isDelete: isDelete
            };

            let op = base.Operation.setFees(opts);
            let tx = new base.TransactionBuilder(source)
                .addOperation(op)
                .build();

            tx.sign(testHelper.master);

            return testHelper.server.submitTransaction(tx);
        });
}

module.exports = {
  setFees
};