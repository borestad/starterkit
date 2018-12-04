import { add, clone, GenericsExample1, GetterSetter } from './index'

describe('Typescript / Jest features', () => {
  // Read more about fake timers: http://facebook.github.io/jest/docs/en/timer-mocks.html#content
  jest.useFakeTimers()

  it('should resolve async methods', async () => {
    expect.assertions(1)
    expect(await Promise.resolve('bar')).toEqual('bar')
  })

  it('should .add()', () => {
    expect(add(1, 2)).toEqual(3)
  })
})

test('clone()', () => {
  const o1 = { a: 1 }
  const o2 = clone(o1)

  expect(o1).not.toBe(o2)
})

describe('GetterSetter', () => {
  test('get()', () => {
    const val = new GetterSetter()
    expect(val.bar).toBe('Hello')
  })

  test('set()', () => {
    const val = new GetterSetter()
    val.bar = 'world'

    expect(val.bar).toBe('Hello world')
  })
})

describe('GenericsExample1', () => {
  test('Using strings', () => {
    const val = new GenericsExample1<string>()

    expect(
      val
        .setValue('Hello World')
        .getValue()
        .toLowerCase()
    ).toBe('hello world')
  })

  test('Using numbers', () => {
    const gen1 = new GenericsExample1<number>()

    expect(
      gen1
        .setValue(2)
        .getValue()
        .valueOf()
    ).toEqual(2)
  })
})
