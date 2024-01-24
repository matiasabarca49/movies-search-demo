import React from 'react'
import './toggleSwitch.css'

const ToggleSwitch = ({label, event}) => {
  return (
    <div className="cl-toggle-switch" >
      <label className="cl-switch">{label}
          <input type="checkbox" onClick={event} />
          <span></span>
      </label>
    </div>
  )
}

export default ToggleSwitch