import { keyValueHelper } from '../helpers'
import { logger } from '../logger'

/**
 * Returns value from k/v storage, if the value is not present, creates the new
 * entry with provided fallback value
 *
 * @param key
 * @param fallbackValue - will be set to k/v storage if no value present
 */
export async function getKvEntryWithFallback (key, fallbackValue) {
  const log = logger.new('getKvEntryWithFallback')

  const existingValue = await keyValueHelper.getEntryValue(key)

  if (existingValue == fallbackValue) {
    log.info(`Found existing value for "${key}": ${existingValue}`)
    return existingValue
  }

  await keyValueHelper.putEntries({
    [key]: fallbackValue
  })

  log.info(`Created new k/v entry: ${key}: ${fallbackValue}`)
  return fallbackValue
}
