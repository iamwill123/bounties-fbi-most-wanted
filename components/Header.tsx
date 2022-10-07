import { find, propEq, sort } from 'ramda'

import { getInteger, getRewardMoney, isNotUndefined } from "../utils"

const TopBountyHeader = ({ items }: any) => {
  let unorderedArrOfNums: any[] = []
  if (items && items.length) {
    for (const i of items) {
      const rewardMoney = getInteger(getRewardMoney(i?.reward_text))
      if (isNotUndefined(rewardMoney))
        unorderedArrOfNums.push({
          id: i.uid,
          bounty: rewardMoney
        })
    }
  }

  const desc = (a: any, b: any) => b.bounty - a.bounty
  const sortedArr = sort(desc, unorderedArrOfNums)
  const highestBountyId = sortedArr[0]?.id

  const getBountyProfile = find(propEq('uid', highestBountyId))
  const bountyProfile = items && getBountyProfile(items)

  // TODO: sort below using hash table
  return <>{
    bountyProfile?.reward_text &&
    <div>
      <h2 style={{ color: 'gold' }}>
        highest bounty: {getRewardMoney(bountyProfile.reward_text)}
      </h2>
      <p>
        {bountyProfile.reward_text}
      </p>
    </div>
  }</>
}

export default TopBountyHeader