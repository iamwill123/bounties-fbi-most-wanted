import { map, uniq, isNil, reject, pipe } from 'ramda'

const isInt = (n: number) => {
  return n % 1 === 0
}

const clean = map(
  pipe(reject(isNil), uniq),
);
export { isInt, clean }