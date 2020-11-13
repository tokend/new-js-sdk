import { api } from '../helpers'
import * as FormData from 'form-data'


describe('API integration test', () => {
  it('Send', async () => {
    const csv = `Operation type,Asset,Amount,Source,Destination,Creator details
      asset-transfers,BTC,10,GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB,GDAH3TH2AXUHU5EMWIUHTILN33A52OR7U6H7NGCLYJNYEPDZIKHD5WZD,{"testKey": "testValue"}`
    var blob = new Blob([csv], {
      encoding: "UTF-8",
      type: "text/csv;charset=UTF-8"
    });
    var formData = new FormData();
    formData.append("mass-operations", blob);

    const response = await api.postWithSignature("/integrations/csv-parser/files/GBA4EX43M25UPV4WIE6RRMQOFTWXZZRIPFAI5VPY6Z2ZVVXVWZ6NEOOB/asset-transfers", formData)
    console.log(response)
  })
})
