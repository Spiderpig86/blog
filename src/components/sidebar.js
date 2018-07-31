import React from 'react'
import PropTypes from 'prop-types'

const Sidebar = props => (
  <div
    style={{
      border: '2px solid #e6e6e6',
      maxWidth: 960,
      padding: '0.5rem',
      marginBottom: '2rem',
      marginTop: '1rem',
    }}
  >
    <div className="row">
      Published <strong>{props.date}</strong>
    </div>
    <div className="row">
      <strong>{props.duration}</strong> { props.duration == 1 ? 'minute' : 'minutes' }
    </div>

    {props.tags.map(tag => {
      return <div>{tag}</div>
    })}
  </div>
)

export default Sidebar
