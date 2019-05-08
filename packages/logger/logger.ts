/**
 * @game/logger
 *
 * Basic `pretty logger` for the Browser only
 *
 * Why not console.log?
 *
 *  ✔︎ Normalize output (make it asier to read)
 *  ✔︎ Vizualize special events (make it easier to find)
 *  ✔︎ Enable custom debugging
 *  ✔︎ Enable support for remote logging
 *  ✔︎ No other open source loggers support keeping line numbers in devtools
 * ︎ ✔ Signale does not support browsers: https://github.com/klaussinani/signale/issues/14
 *
 */

import figures from 'figures'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const win = window as any

// Helpers
// ----------------------------------------------------------------------------
const pad = (str = '', len = 10, chars = ' ') => {
  const filling = (str.trimRight().match(/(%c|\s)/gi) || []).length
  return str.padEnd(len + filling, chars)
}

/* Converts an Object to a CSS-string */
const jsToCss = (obj = {}) => {
  return Object.entries(obj)
    .reduce((s, [k, v]) => `${s}${k}:${v};`, '')
    .replace(/([A-Z])/g, m => `-${m[0].toLowerCase()}`)
}

const formatter = ({ icon = '', text = '', css = {} }) => [
  `${icon} %c%s`,
  jsToCss(css),
  pad(text)
]

const bind = (logger: any, args: any) => {
  return logger.bind(console, ...args)
}

// Public
// ----------------------------------------------------------------------------

export const success = bind(
  console.log,
  formatter({
    icon: figures('✔︎'),
    css: { color: 'green', fontWeight: 'bold' },
    text: 'success'
  })
)

export const error = console.error.bind(
  console,
  pad(` %c error %c`),
  jsToCss({ color: 'white', background: 'red', marginRight: '-4px' }),
  ''
)

export const fail = console.trace.bind(
  console,
  pad(` %c fail %c`),
  jsToCss({ color: 'white', background: 'red', paddingRight: '0px' }),
  ''
)

export const warn = bind(
  console.warn,
  formatter({
    icon: figures.cross,
    css: { color: 'red', fontWeight: 'bold' },
    text: 'warn'
  })
)

export const ok = console.log.bind(
  console,
  `${figures.heart} %c%s`,
  'background: transparent; color: black; font-weight:normal',
  pad('ok')
)

export const info = console.log.bind(
  console,
  '%c%s',
  'background: white; color: black; font-weight:bold',
  pad('info')
)

export const group = console.group.bind(
  console,
  '%c%s',
  'background: white; color: green; font-weight:bold',
  pad('group')
)

export const groupEnd = console.groupEnd.bind(
  console,
  '%c%s',
  'background: white; color: green; font-weight:bold',
  pad('groupEnd')
)

const log = {
  success,
  ok,
  info,
  error,
  group,
  groupEnd,
  warn,
  fail
}

// Enable quick debugging access in the browser
if (win) {
  win.c = win.c || log
}

export default log
