import { csvParserHelper, masterKP } from '../helpers'

const performanceTestsRowsCount = 1_000_000

describe('CSV Parser tests', () => {
  describe('Integration tests', () => {
    it('Upload valid "* .csv" file for the Mass Compulsory Asset Transfer operation', async () => {
      const csv = "Operation type,Asset,Amount,Source,Source type,Destination,Destination type,Creator details\nCompulsory Asset Transfer,BTC,10,GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB,account_id,GDAH3TH2AXUHU5EMWIUHTILN33A52OR7U6H7NGCLYJNYEPDZIKHD5WZD,account_id,{\"testKey\": \"testValue\"}"

      await expectPromiseNoThrow(csvParserHelper.uploadCsv(csv,
        `/integrations/csv-parser/files/${masterKP.accountId()}/asset-transfers`))
    })
    it('Upload invalid "* .csv" file for the Mass Compulsory Asset Transfer operation', async () => {
      const csv = "Operation type,Asset,Amount,Source,Source type,Destination,Destination type,Creator details\nCompulsory Asset Transfer,BTC,10,GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB,account_id,,,{\"testKey\": \"testValue\"}"

      await catchPromise(csvParserHelper.uploadCsv(csv,
        `/integrations/csv-parser/files/${masterKP.accountId()}/asset-transfers`))
    })
    it('Upload valid "* .csv" file for the Mass Review operation', async () => {
      const csv = "Operation type,Operation ID,Action,Reason,Request hash,Tasks to add,Tasks to remove,External details\nReview,1,1,Test reason,test,1,0,{\"testKey\": \"testValue\"}"

      await expectPromiseNoThrow(csvParserHelper.uploadCsv(csv,
        `/integrations/csv-parser/files/${masterKP.accountId()}/reviews`))
    })
    it('Upload invalid "* .csv" file for the Mass Review operation', async () => {
      const csv = "Operation type,Operation ID,Action,Reason,Request hash,Tasks to add,Tasks to remove,External details\nReview,1,1,Test reason,test,1,0,{\"testKey\": \"testValue\"}"

      await catchPromise(csvParserHelper.uploadCsv(csv,
        `/integrations/csv-parser/files/${masterKP.accountId()}/reviews`))
    })
    it('Upload valid "* .csv" file for the Mass Unlock of Unclaimed Assets operation', async () => {
      const csv = "Operation type,Deferred Payment,Asset,Amount,Creator details\nUnlock of Unclaimed Assets,1,UAH,10,{\"testKey\": \"testValue\"}"

      await expectPromiseNoThrow(csvParserHelper.uploadCsv(csv,
        `/integrations/csv-parser/files/${masterKP.accountId()}/asset-unlocks`))
    })
    it('Upload invalid "* .csv" file for the Mass Unlock of Unclaimed Assets operation', async () => {
      const csv = "Operation type,Deferred Payment,Asset,Amount,Creator details\nUnlock of Unclaimed Assets,1,UAH,,{\"testKey\": \"testValue\"}"

      await catchPromise(csvParserHelper.uploadCsv(csv,
        `/integrations/csv-parser/files/${masterKP.accountId()}/asset-unlocks`))
    })
    it('Upload valid "* .csv" file for the Mass Payments operation', async () => {
      const csv = "Operation type,Asset,Amount,Destination,Destination type,Creator details\nPayment,UAH,10,GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB,account_id,{\"testKey\": \"testValue\"}"

      await expectPromiseNoThrow(csvParserHelper.uploadCsv(csv,
        `/integrations/csv-parser/files/${masterKP.accountId()}/payments`))
    })
    it('Upload invalid "* .csv" file for the Mass Payments operation', async () => {
      const csv = "Operation type,Asset,Amount,Destination,Destination type,Creator details\nPayment,UAH,10,,account_id,{\"testKey\": \"testValue\"}"

      await catchPromise(csvParserHelper.uploadCsv(csv,
        `/integrations/csv-parser/files/${masterKP.accountId()}/payments`))
    })
  })
  describe('Performance tests', () => {
    it('Upload the "* .csv" file with the data for 1 million transactions for the Mass Compulsory Asset Transfer operation', async () => {
      var csv = "Operation type,Asset,Amount,Source,Source type,Destination,Destination type,Creator details"
      for (var i = 0; i < performanceTestsRowsCount; i++) {
        csv = csv + "\nCompulsory Asset Transfer,BTC,10,GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB,account_id,GDAH3TH2AXUHU5EMWIUHTILN33A52OR7U6H7NGCLYJNYEPDZIKHD5WZD,account_id,{\"testKey\": \"testValue\"}"
      }

      await expectPromiseNoThrow(csvParserHelper.uploadCsv(csv,
        `/integrations/csv-parser/files/${masterKP.accountId()}/asset-transfers`))
    })
    it('Upload the "* .csv" file with the data for 1 million transactions for the Mass Review operation', async () => {
      var csv = "Operation type,Operation ID,Action,Reason,Request hash,Tasks to add,Tasks to remove,External details"
      for (var i = 0; i < performanceTestsRowsCount; i++) {
        csv = csv + "\nReview,1,1,Test reason,test,1,0,{\"testKey\": \"testValue\"}"
      }

      await expectPromiseNoThrow(csvParserHelper.uploadCsv(csv,
        `/integrations/csv-parser/files/${masterKP.accountId()}/reviews`))
    })
    it('Upload the "* .csv" file with the data for 1 million transactions for the Mass Unlock of Unclaimed Assets operation', async () => {
      var csv = "Operation type,Deferred Payment,Asset,Amount,Creator details"
      for (var i = 0; i < performanceTestsRowsCount; i++) {
        csv = csv + "\nUnlock of Unclaimed Assets,1,UAH,10,{\"testKey\": \"testValue\"}"
      }

      await expectPromiseNoThrow(csvParserHelper.uploadCsv(csv,
        `/integrations/csv-parser/files/${masterKP.accountId()}/asset-unlocks`))
    })
    it('Check the performance of the "* .csv" file with the data for 1 million transactions for the Mass Payments operation', async () => {
      var csv = "Operation type,Asset,Amount,Destination,Destination type,Creator details"
      for (var i = 0; i < performanceTestsRowsCount; i++) {
        csv = csv + "\nPayment,UAH,10,GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB,account_id,{\"testKey\": \"testValue\"}"
      }

      await expectPromiseNoThrow(csvParserHelper.uploadCsv(csv,
        `/integrations/csv-parser/files/${masterKP.accountId()}/payments`))
    })
  })
})
