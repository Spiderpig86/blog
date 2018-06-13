import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <div
    className="header header-fixed header-clear"
    style={{
      background: '#fff',
      marginBottom: '3rem',
      paddingTop: '1.5rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        padding: '0 1.0875rem',
      }}
    >
      <div className="header-nav">
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
  background: '#222',
  marginTop: '.15rem',
  marginBottom: '.15rem',
  width: '30px',
}

export default Header
