import { add } from '@scope/example-lib1'

export const double = (x: number) => {
  return add(x, x)
}

function foo () {
  console.log('foo')
}
