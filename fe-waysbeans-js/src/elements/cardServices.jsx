import React from 'react'

const CardServices = ({bg, bgBorder}) => {
  return (
    <div className="mx-4 w-64 h-80 rounded-xl flex flex-col p-6 justify-around border border-isSecondary">
      <i className="text-isSecondary fa-solid fa-mug-hot text-5xl"></i>

      <p className='text-isSecondary text-2xl font-bold'>Best Quality</p>
      <p className='text-isSecondary'>Quality and guaranteed products can be felt when relaxing or accompanying activities</p>
    </div>
  )
}

export default CardServices