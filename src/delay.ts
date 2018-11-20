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
 *
 * @param {string} name - A name.
 * @param {number=} [delay=Delays.Medium] - Number of milliseconds to delay resolution of the Promise.
 * @returns {Promise<string>}
 */
async function delayedHello(name: string, delay: number = Delays.Medium) {
  return new Promise<string>(resolve =>
    setTimeout(() => resolve(`Hello, ${name}`), delay)
  )
}

export async function greeter(name: string) {
  return delayedHello(name, Delays.Long)
}
