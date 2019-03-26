import { memoize } from 'lodash'
import * as path from 'path'

const valid = ['development', 'production', 'test']

// ============================================================================
// Private Helpers
// ============================================================================
function assertValidEnv(env) {
  if (!valid.includes(env)) {
    throw new Error(`Missing valid NODE_ENV argument: ${valid.join(',')}`)
  }
  return false
}

// ============================================================================
// Generic Utility Helper
// ============================================================================
export const util: { [k: string]: any } = {}

util.resolve = memoize(relativePath => {
  return path.resolve(path.resolve(process.cwd()), relativePath)
})

// ============================================================================
// Environment Helpers
// ============================================================================
const NODE_ENV: string = process.env.NODE_ENV || ''
const WEB_DEBUG: string = process.env.WEB_DEBUG || ''

const isEnv = env => assertValidEnv(env) || env === NODE_ENV
const isProd = () => isEnv('production')
const isDev = () => isEnv('development')
const isTest = () => isEnv('test')
const isDebug = () => Boolean(WEB_DEBUG)

export const env = {
  NODE_ENV,
  isEnv,
  isProd,
  isDev,
  isTest,
  isDebug
}
