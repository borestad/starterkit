import { delayedPromise, Delays } from './delay'

describe('greeter function', () => {
  // Read more about fake timers: http://facebook.github.io/jest/docs/en/timer-mocks.html#content
  jest.useFakeTimers()

  const message = 'Hello world'
  let str: string

  // Act before assertions
  beforeAll(async () => {
    const p: Promise<string> = delayedPromise(message, Delays.Long)
    jest.runOnlyPendingTimers()
    str = await p
  })

  it('delays the greeting by 5 seconds', () => {
    expect.assertions(2)

    expect(global.setTimeout).toHaveBeenCalledTimes(1)
    expect((global.setTimeout as jest.Mock).mock.calls[0][1]).toBe(Delays.Long)
  })

  // Assert greeter result
  it('Sends back a custom message', () => {
    expect(str).toBe('Hello world')
  })
})
