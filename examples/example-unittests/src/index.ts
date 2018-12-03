/**
 * Example of simple function
 */
export function add(a: number, b: number) {
  return a + b
}

/**
 * Example of using the spread operator
 */
export function clone(obj: {}): object {
  return { ...obj }
}

/**
 * Example of using getters/setters
 */
export class GetterSetter {
  private _val: string = ''

  get bar() {
    return `Hello ${this._val}`.trim()
  }

  set bar(val) {
    this._val = val
  }
}

export class GenericsExample1<T> {
  value!: T
  setValue(value: T) {
    this.value = value
    return this
  }
  getValue(): T {
    return this.value
  }
}
