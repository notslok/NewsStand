import React, { Component } from 'react'
import load from '../loading.gif'

const loading = () => {
  
    return (
      <div className='text-center'>
        <img className="my-3" src={load} alt="loading..."/>
      </div>
    )
}

export default loading
