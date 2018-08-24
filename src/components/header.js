import React from 'react'
import Media from 'react-media'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <div
    className="header header-fixed header-clear"
    style={{
      background: 'linear-gradient(to bottom, #fff 30%, transparent)',
      marginBottom: '3rem',
      paddingTop: '1rem',
    }}
  >
    <div
      style={{
        background: 'transparent',
        margin: '0 auto',
        padding: '0 1.0875rem',
      }}
    >
      <div className="header-nav" style={{ background: 'transparent' }}>
        <div className="nav-left">
          <div className="nav-item">
            <h1
              style={{
                margin: 0,
                textAlign: 'center',
                background: 'transparent',
              }}
            >
              <Link
                className="header-brand"
                to="/"
                style={{
                  color: '#222',
                  textDecoration: 'none',
                }}
              >
                {siteTitle}
              </Link>
            </h1>
          </div>
        </div>
        <div className="nav-center" />
        <div className="nav-right" style={{ display: 'flex' }}>
          <div className="nav-item">
            <div
              className="burger"
              style={{
                background: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                right: 0,
              }}
            >
              <div
                style={{...burgerPiece, ...{ alignSelf:'flex-end', width: '15px' }}}
              />
              <div
                style={burgerPiece}
              />
              <div
                style={{...burgerPiece, ...{ width: '15px' }}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const burgerPiece = {
  height: '4px',
  borderRadius: '4px',
  marginTop: '.15rem',
  marginBottom: '.15rem',
  width: '30px',
}

export default Header
