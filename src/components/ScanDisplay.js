import React from 'react'

const Display = ({ productDetails }) => {
  return (
    <div>
      {
        productDetails === null? 
        <h1>No Product Found</h1> :
        <div>
          <h1>{productDetails.name} found</h1>
          <ul>
            {
              productDetails['harmful-ing'].map(ing => {
                return <li>{ing}</li>
              })
            }
          </ul>
        </div>
      }
    </div>
  )
}

export default Display;