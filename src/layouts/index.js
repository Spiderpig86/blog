import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Media from 'react-media' // Listens for matches to CSS media query and renders components

import Header from '../components/header'

import '../styles/cirrus.header.css'
import './index.scss'
import '../styles/layout-override.scss'
import '../styles/gradient.scss'
import { styles } from '../styles/component-styles/index-styles'

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title="slim blog"
      meta={[
        { name: 'description', content: 'The musings of Stanley' },
        { name: 'keywords', content: 'stanley, lim, blog' },
      ]}
    />
    <Header siteTitle="slim" />

    <Media query={{ maxWidth: 848 }}>
      {(
        matches // Inline function for checking if rules match above (less than 848px)
      ) =>
        matches ? (
          <div
            style={{ ...styles.indexBody, ...{ paddingTop: '3rem' }}}
          >
            <div
              style={ styles.indexChildWrapper }
            >
              <div style={{ flex: 1 }}>{children()}</div>
            </div>
          </div>
        ) : (
          <div
            style={{ ...styles.indexBody, ...{ paddingTop: '7rem' }}}
          >
            <div
              style={ styles.indexChildWrapper }
            >
              {children()}
            </div>
          </div>
        )
      }
    </Media>
  </div>
)

/* Explicitly define our prop types */
Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout
