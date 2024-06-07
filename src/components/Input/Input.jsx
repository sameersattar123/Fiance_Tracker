import React from 'react'
import "./style.css"

const Input = ({label , state , setState , placeholder}) => {
  return (
    <div className='input-wrapper'>
        <p className="label-input">{label}</p>
        <input
        placeholder={placeholder}
        value={state}
        className='custom-input'
        onChange={(e) => setState(e.target.value)}
        />
    </div>
  )
}

export default Input