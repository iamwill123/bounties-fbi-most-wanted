import { find, propEq, sort } from 'ramda'

import { ImageType } from '../context/WantedListProvider'
import { getInteger, getRewardMoney, isNotUndefined } from "../utils"
import ImageWithHideOnError from './ImageWithOnError'

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

  return <>{
    bountyProfile?.reward_text &&
    <div style={{ backgroundColor: '#0a3c88', margin: 'auto', textAlign: 'center' }}>
      <h1 style={{ color: 'gold', fontSize: '40px' }}>
        Highest bounty - {getRewardMoney(bountyProfile.reward_text)}
      </h1>
      <div>
        <div
          style={{
            display: 'flex',
            maxWidth: '1000px',
            margin: 'auto',
            justifyContent: 'center',
            flexFlow: 'wrap',
          }}
        >
          {bountyProfile?.images.map(
            ({ caption, original }: ImageType, i: number) => {
              return (
                <div key={caption + i}>
                  <ImageWithHideOnError
                    src={original}
                    alt={caption}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              )
            }
          )}
        </div>
      </div>
      <p>
        {bountyProfile.reward_text}
      </p>
    </div>
  }</>
}

export default TopBountyHeader