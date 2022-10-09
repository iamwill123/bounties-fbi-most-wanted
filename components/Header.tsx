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
    <div style={{ margin: 'auto', display: 'flex', flexDirection: 'row', padding: '40px 0px' }}>
      <div style={{ width: '100%' }}>
        <div style={{ color: '#718096', fontSize: '1.25rem', textTransform: 'uppercase' }}>
          Highest bounty
        </div>
        <div style={{ color: 'white', fontSize: '3rem', lineHeight: '1.2' }}>
          {getRewardMoney(bountyProfile.reward_text)}
        </div>
        <p>
          {bountyProfile.reward_text}
        </p>
      </div>
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
    </div>
  }</>
}

export default TopBountyHeader