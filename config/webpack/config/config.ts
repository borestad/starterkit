import * as ip from 'internal-ip'
import * as moment from 'moment'
import { gitRoot, gitShortHash } from '../lib/index'
import { env, util } from './helper'

// ============================================================================
// Default Configuration
// ============================================================================

export const IP = ip.v4.sync()

export const paths = {
  gitRoot: gitRoot(),
  root: util.resolve(''),
  config: util.resolve('config'),
  dist: util.resolve('dist'),
  nodeModules: util.resolve('node_modules'),
  vendor: util.resolve('vendor'),
  packageJSON: util.resolve('package.json')
}

// ============================================================================
// Global Environment
// ============================================================================

console.log(process.env.WEB_DEBUG)

export const EXTRAS = {
  __DEV__: env.isDev(),
  __PROD__: env.isProd(),
  __TEST__: env.isTest(),
  __VERSION__: JSON.stringify(require(paths.packageJSON).version),
  __BUILD_DATE__: moment().format('YYYYMMDD-HHmmss'),
  __GITHASH__: gitShortHash(),
  __DEBUG__: env.isDebug()
}

export const globals = {
  'process.env': {
    NODE_ENV: JSON.stringify(env.NODE_ENV)
  },
  ...EXTRAS
}

// ============================================================================
// Server Configuration
// ============================================================================

export const server = {
  HOST: process.env.HOST || IP || 'localhost',
  PORT: process.env.PORT || '8888'
  // server_host : ip.address(),
  // server_port : process.env.PORT || 3000
}
