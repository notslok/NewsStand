import React, { Component } from 'react'
import load from '../loading.gif'

export class loading extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className="my-3" src={load} alt="loading..."/>
      </div>
    )
  }
}

export default loading
