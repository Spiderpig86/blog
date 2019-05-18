import React from 'react'
import Link from 'gatsby-link'
import Media from 'react-media'

const Header = ({ siteTitle }) => (
  <div
    className="header header-fixed header-clear"
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderBottom: '1px solid #e1e1e1',
      boxShadow: '0 0.2rem 1.25rem 0 rgba(27,30,36,.07)',
    }}
  >
    <div
      style={{
        background: 'transparent',
        margin: '0 auto',
        padding: '0 1.0875rem',
      }}
    >
    
      <Media query={{ minWidth: 848 }}>
        {(
          matches
        ) => matches ? (
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
        ) : (
          <div className="header-nav" style={{ background: 'transparent' }}>
            <div className="nav-center">
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
          </div>
        )
      }
      </Media>
      
    </div>
  </div>
)

const burgerPiece = {
  height: '4px',
  borderRadius: '4px',
  marginTop: '.15rem',
  marginBottom: '.15rem',
  paddingTop: '3px',
  width: '30px',
}

export default Header
