import React from 'react'
import PropTypes from 'prop-types'

import { styles } from '../styles/component-styles/sidebar-styles';

const Sidebar = props => (
  <div
    style={{
      backgroundColor: '#fff',
      boxShadow: '0 0.2rem 1.25rem 0 rgba(27, 30, 36, 0.07)',
      maxWidth: 960,
      padding: '1rem',
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


    <strong>Tags</strong>

    <div className="row">
        {props.tags.map((tag, i) => {
            return <div style={styles.tagStyle} key={i}>{tag}</div>
        })}
    </div>
  </div>
)

export default Sidebar
