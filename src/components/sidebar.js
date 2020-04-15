import React from 'react'
import Link from 'gatsby-link'
import ColorHash from 'color-hash'

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
      position: 'sticky',
      top: '7rem'
    }}
  >
    <div className="row" style={{
      marginBottom: '1rem'
    }}>
      ✏️ Published <strong>{props.date}</strong>
    </div>
    <div className="row" style={{
      marginBottom: '1rem'
    }}>
      ⏲ <strong>{props.duration}</strong> { props.duration === 1 ? 'minute' : 'minutes' }
    </div>

    <div className="row" style={{
      marginBottom: '1rem'
    }}>
        {props.tags.map((tag, i) => {
            const colorHash = new ColorHash({lightness: 0.5})
            const color = colorHash.hex(tag);

            return (
              <Link to={ `/tag/${tag}` } style={{
                ...styles.tagStyle,
                backgroundColor: color,
                color: '#fff'
              }} key={i}>
                {tag}
              </Link>
            )
        })}
    </div>
  </div>
)

export default Sidebar
