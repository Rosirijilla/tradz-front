import React from 'react'
import Carousel from './Carousel'
import Categorys from './Categorys';

const Header = () => {
  return (
    <div>
      <div className='text-center'>
        <Carousel />
      </div>
      <Categorys />
    </div>
  )
}

export default Header