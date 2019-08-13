/**
 * Allows any type on the global ojbect
 * Note: Obviously globals should be avoided - but avoids code like (window as any).foo = 'bar'
 */
declare interface Window {
  [key: string]: any
}
