import Image from 'next/image'
import React, { useState } from 'react'
import { Skeleton } from '@chakra-ui/react'

const ImageWithHideOnError = (props: any) => {
  const [hideImage, setHideImage] = useState(false)
  const [showLoader, setShowLoader] = useState(true)

  return (
    !hideImage ? (
      <div
        style={{ position: "relative", minWidth: "250px", minHeight: "200px", marginBottom: '20px', margin: '5px' }}
      >
        {
          showLoader &&
          <Skeleton style={{ height: '150px' }}>
            <div>loader</div>
          </Skeleton>
        }
        <Image
          {...props}
          style={{ background: 'trans', opacity: !showLoader ? 1 : 0, transition: '500ms' }}
          onLoadingComplete={() => {
            setShowLoader(false)
          }}
          onError={() => {
            setHideImage(true)
          }}
          alt={props.alt}
        />
      </div>
    ) : (
      <></>
    )
  )
}

export default ImageWithHideOnError