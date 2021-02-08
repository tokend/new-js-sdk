import { Helper } from './_helper'
import FormData from 'form-data'
import { api } from './index'

export class CsvParser extends Helper {
  async uploadCsv (csvContent, endpoint) {
    let formData = new FormData()
    formData.append('data.csv', csvContent, 'data.csv')

    return api.call({
      endpoint: endpoint,
      contentType: `multipart/form-data; boundary=${formData.getBoundary()}`,
      method: 'POST',
      needSign: true,
      data: formData
    })
  }
}
