import { isNil, map, pipe, reject, uniq } from 'ramda'

const isInt = (n: number) => {
  return n % 1 === 0
}

export { isInt }