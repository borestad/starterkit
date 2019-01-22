import { add } from '@scope/example-lib1'

export const double = (x: number) => {
  console.log('hello world')
  return add(x, x)
}
