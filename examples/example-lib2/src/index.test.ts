/// <reference types="jest" />
import { double } from '.'

test('Something', () => {
  expect(double(10)).toBe(20)
})

try {
  ;(window as any).doSomething()
} catch (error) {
  // console.log('foo')
  // …
}
