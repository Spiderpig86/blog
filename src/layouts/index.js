import React from 'react'
import Helmet from 'react-helmet'
import Media from 'react-media' // Listens for matches to CSS media query and renders components

import Header from '../components/header'

import { styles } from '../styles/component-styles/index-styles'

const Layout = ({ children, data }) => {
  return (
    <div>
      <Helmet>
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
      </Helmet>
      <Header siteTitle="slim" />

      <Media query={{ maxWidth: 848 }}>
        {(
          matches // Inline function for checking if rules match above (less than 848px)
        ) =>
          matches ? (
            <div style={{ ...styles.indexBody, ...{ paddingTop: '7rem' } }}>
              <div id="post-container" style={styles.indexChildWrapper}>
                <div
                  style={{
                    flex: 1,
                    maxWidth: '100%',
                    flexFlow: 'column-reverse',
                  }}
                >
                  {children}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ ...styles.indexBody, ...{ paddingTop: '7rem' } }}>
              <div id="post-container" style={styles.indexChildWrapper}>
                {children}
              </div>
            </div>
          )
        }
      </Media>
    </div>
  )
}

export default Layout
