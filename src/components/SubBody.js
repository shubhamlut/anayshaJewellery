import React from 'react'
import imageOne from '../images/alyssa-strohmann-qOIGvGoVNtc-unsplash.jpg'
import imageTwo from '../images/anastasia-anastasia-nlQFycTD04M-unsplash.jpg'
import imageThree from '../images/lilartsy-ZhmbakzCBtk-unsplash.jpg'
import imageFour from '../images/tara-yates-ZL7JpQ3d1Yk-unsplash.jpg'
const SubBody = () => {
  return (
    <div>
        <div className="subbodyheader">
        <p>Anaysha - Collection Highlights</p>
        <h2>Express who you are</h2>
        </div>
      <div className="Subbody">
<div>
    <img src={imageOne} alt="" />
</div>
<div>
    <img src={imageTwo} alt="" />
</div>
<div>
    <img src={imageThree} alt="" />
</div>
<div>
    <img src={imageFour} alt="" />
</div>
      </div>
    </div>
  )
}

export default SubBody
