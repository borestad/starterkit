/**
 * Some predefined delays (in milliseconds).
 */
export enum Delays {
  Short = 500,
  Medium = 2000,
  Long = 5000
}

/**
 * Returns a Promise<string> that resolves after given time.
 */
export async function delayedPromise(str: string, delay: number) {
  return new Promise<string>(resolve => setTimeout(() => resolve(str), delay))
}
