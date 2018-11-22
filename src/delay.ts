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
async function delayedPromise(name: string, delay: number) {
  return new Promise<string>(resolve =>
    setTimeout(() => resolve(`Hello, ${name}`), delay)
  )
}

export async function greeter(name: string) {
  return delayedPromise(name, Delays.Long)
}
