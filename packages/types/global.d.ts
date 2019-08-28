/**
 * Allows any type on the global ojbect
 * Note: Obviously globals should be avoided - but avoids code like (window as any).foo = 'bar'
 */
declare interface Window {
  [key: string]: any
}

declare module '*.jpg' {
  const image: any
  export = image
}

declare module '*.png' {
  const image: any
  export = image
}

declare module '*.svg' {
  const image: any
  export = image
}

declare module '*.json' {
  const json: any
  export = json
}

declare module '*.css' {
  const styles: any
  export = styles
}

declare module '*.woff' {
  const fonts: any
  export = fonts
}

declare module '*.woff2' {
  const fonts: any
  export = fonts
}

declare const __DEV__: boolean
declare const __PROD__: boolean
declare const __VERSION__: string
declare const __BUILD_DATE__: string
declare const __NODE_ENV__: string
