import React from 'react'

const PrimaryButton = ({ children, classes, handler }) => {
  return (
    <button
      onClick={handler}
      className={`text-white  bg-gray-600 ${classes}`}
    >
      {children}
    </button>
  )
}

export default PrimaryButton
