import React from 'react'
import image from '../images/pat-kwon-ZZOGqLb9CXE-unsplash.jpg'

const Finejewellery = () => {
  return (
    <div className='highJewelleryList'>
      <div className='highJewelleryListCatagory'>
        <h2>PRODUCT CATEGORY</h2>
        <ul>
        <li>NECKLACES/PENDANTS</li>
        <li>BRACELETS/BANGLES</li>
        <li>EARRINGS</li>
        <li>RINGS</li>
        </ul>
      </div>

      <div className='highJewelleryListCatagory'>
        <h2>LIMITED EDITIONS</h2>
        <ul>
        <li>ADVENTURE</li>
        <li>EMPOWERMENT</li>
        <li>ENERGY</li>
        <li>RARITY</li>
        </ul>
      </div>

      <div className='highJewelleryListCatagory'>
        <h2>METALS & GEMSTONES</h2>
        <ul>
        <li>GOLD JEWELLERY</li>
        <li>ROSE GOLD JEWELLERY</li>
        <li>WHITE GOLD JEWELLERY</li>
        <li>DIAMOND JEWELLERY</li>
        </ul>
      </div>
      <div className='highJewelleryListCatagory'>
        <img className='image' src={image} alt="" />
      </div>
    </div>
  )
}

export default Finejewellery

