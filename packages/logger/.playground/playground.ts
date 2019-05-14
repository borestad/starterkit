import log from '../logger'

log.ok()
log.ok('Hello OK')

log.error()
log.error('A custom error')

try {
  throw new Error('Error')
} catch (e) {
  log.error(e)
}
