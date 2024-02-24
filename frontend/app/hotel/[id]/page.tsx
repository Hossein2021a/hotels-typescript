import React from 'react'
import SingleHotel from './SingleHotel'

function Hotel({params} : {params  : {id : string}}) {

  return (
    <>
    <SingleHotel  params={params}/>
        
        
    </>
  )
}

export default Hotel