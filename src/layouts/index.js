import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Media from 'react-media' // Listens for matches to CSS media query and renders components

import Header from '../components/header'
import Sidebar from '../components/sidebar'
import Prologue from '../components/prologue'

import '../styles/cirrus.header.css'
import './index.css'
import '../styles/layout-override.css'

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title="slim blog"
      meta={[
        { name: "description", content: "The musings of Stanley" },
        { name: "keywords", content: "stanley, lim, blog" }
      ]}
    />
    <Header
      siteTitle="slim"
    />
    <div
      style={{
        margin: "0 auto",
        paddingTop: "7rem",
        maxWidth: 980,
        flexDirection: "row",
        justifyContent: "space-between",
        height: "100%",
      }}
    >

    <Prologue />
    
      <Media query={{ maxWidth: 848 }}>
        { matches => // Inline function for checking if rules match above (less than 848px)
            matches ? (
              <div
                style={{
                  margin: "0 auto",
                  maxWidth: 980,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height: "100%",
                  padding: "25px",
                }}
              >
                <div style={{ flex: 1 }}>{ children() }</div>
              </div>
            ) : (
              <div
                style={{
                  margin: "0 auto",
                  maxWidth: 980,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height: "100%",
                  padding: "25px",
                }}
              >
                <div style={{ flex: 2.5, paddingRight: "2rem" }}>{ children() }</div>

                <div style={{ flex: 1 }}>
                  <Sidebar
                    title="about me"
                    description="just your average developer who recently discovered the Yugo"
                  />
                </div>
              </div>
            )
        }
      </Media>
    </div>
  </div>
);

/* Explicitly define our prop types */
Layout.propTypes = {
  children: PropTypes.func
};

export default Layout;