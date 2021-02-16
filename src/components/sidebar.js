import React from 'react'
import Link from 'gatsby-link'
import ColorHash from 'color-hash'

import { styles } from '../styles/component-styles/sidebar-styles'

const Sidebar = (props) => (
  <div
    style={{
      backgroundColor: 'var(--bg-secondary)',
      boxShadow: '0 0.2rem 1.25rem 0 rgba(27, 30, 36, 0.07)',
      maxWidth: 960,
      padding: '1rem',
      marginBottom: '2rem',
      marginTop: '1rem',
      top: '7rem',
      position: props.sticky ? 'sticky' : 'inherit',
    }}
  >
    <div className="row">
      ✏️ Published <strong>{props.date}</strong>
    </div>
    <div
      className="row"
      style={{
        marginBottom: '1rem',
      }}
    >
      ⏲ <strong>{props.duration}</strong>{' '}
      {props.duration === 1 ? 'minute' : 'minutes'}
    </div>

    <div
      className="row"
      style={{
        marginBottom: '1rem',
      }}
    >
      {props.tags.map((tag, i) => {
        const colorHash = new ColorHash({ lightness: 0.5 })
        const color = colorHash.hex(tag)

        return (
          <Link
            to={`/tag/${tag}`}
            style={{
              ...styles.tagStyle,
              backgroundColor: color,
              color: '#fff',
            }}
            key={i}
          >
            {tag}
          </Link>
        )
      })}
    </div>

    <hr
      style={{
        backgroundColor: 'var(--hr)',
        marginBottom: '2rem',
      }}
    />
    <p>
      <b>Subscribe</b> to receive notifications for any <b>new post</b>!
    </p>
    <form action="https://stanleylim.us2.list-manage.com/subscribe">
      <div className="form-group">
        <input
          type="email"
          className="form-group-input input-small"
          autoCapitalize="off"
          autoCorrect="off"
          name="MERGE0"
          id="MERGE0"
          placeholder="Email"
          defaultValue=""
          style={{
            color: '#222',
            lineHeight: 'normal',
          }}
        />
        <input
          type="hidden"
          name="u"
          defaultValue="c29a21f0dd7ce0561ec3adb9f"
          
        />
        <input type="hidden" name="id" defaultValue="f783a43c04" />{' '}
        <input
          type="hidden"
          name="ht"
          defaultValue="ed00e8c36ca669627ce34a5802d7c3f956e35fa7:MTYwMzYxNzkyNy40MzE0"
        />
        <button type="submit" className="form-group-btn btn-small btn-primary uppercase">
          Subscribe
        </button>
      </div>
    </form>
    <span>
      Or follow this RSS feed
      <a className="ml-1" href="/rss.xml" target="_blank">
        <i className="fa fa-rss"></i>
      </a>
    </span>
  </div>
)

export default Sidebar
