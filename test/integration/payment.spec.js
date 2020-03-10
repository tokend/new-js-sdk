import { createPayment, createPaymentRequest } from '../scripts/create_payment'
import { keyValueHelper } from '../helpers'
import { KEY_VALUE_KEYS } from '../../src/const'
import {createPaymentStory} from '../scripts/createStory'
import { Asset } from '../helpers/asset'
import {createAndApproveAsset} from "../scripts/create_asset";

describe.only('Payment', () => {
  // it('should create payment request and auto approve it', async() => {
  //   await keyValueHelper.putEntries({
  //     [ KEY_VALUE_KEYS.paymentCreateTasks + ':*:*' ]: 0
  //   })
  //   await createPaymentRequest()
  // })
  // it('should create payment operation and submit it', async () => {
  //   await createPayment()
  // })
    it('create story with much same references', async () => {
      for (let i = 0; i < 100000; i++) {
        await createPaymentStory()
      }
    })

})
