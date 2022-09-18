import Image from 'next/image'
import React, { useState } from 'react'

const ImageWithHideOnError = (props: any) => {
  const [hideImage, setHideImage] = useState(false)

  return (
    !hideImage ? (
      <div
        style={{ position: "relative", minWidth: "250px", minHeight: "200px", marginBottom: '20px', margin: '5px' }}
      >
        <Image
          {...props}
          style={{ background: 'white' }}
          onError={() => {
            setHideImage(true)
          }}
          alt={props.alt}
        />
      </div>
    ) : <></>
  )
}

export default ImageWithHideOnError