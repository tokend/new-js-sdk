import { logger } from '../logger'
import {
  stampHelper,
  licenseHelper
} from '../helpers'

export async function fullLicenseSubmit (opts, keys, source) {
  const log = logger.new('fullLicenseSubmit')

  const stampResult = await stampHelper.makeStamp({
    source: source
  })
  log.info(`Created stamp: ledger:${stampResult.ledgerHash().toString('hex')} license: ${stampResult.licenseHash().toString('hex')}`)

  let licenseOpts = {
    adminCount: opts.adminCount,
    dueDate: opts.dueDate,
    ledgerHash: stampResult.ledgerHash(),
    prevLicenseHash: stampResult.licenseHash()
  }
  const licenseResult = await licenseHelper.create(licenseOpts, keys)
  return licenseResult
}
