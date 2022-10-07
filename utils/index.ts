import { match, replace } from 'ramda'

const isInt = (n: number) => n % 1 === 0
const isNotUndefined = (n: any) => n !== undefined

// * Match number
const numAfter$OnlyRegex = /\$\d+(?:,\d+)*(?:\.\d+)?/
const getRewardMoney = (str: string | any) => !!str && match(numAfter$OnlyRegex, str)
// const getHighestBounty = (arr: [string]) => { }
// const getInteger = (str: string | any): any => typeof str[0] === "string" && str[0].replace(/[^\d]/g, '')
const getInteger = (str: string | any): any => str[0] && replace(/[^\d]/g, '', str[0])

type ScrollProps = {
  top: number
  left: number
  behavior: string | any
}

const scrollBackToTop = (props: ScrollProps) => window.scroll(props)

export { isInt, isNotUndefined, scrollBackToTop, getRewardMoney, getInteger }