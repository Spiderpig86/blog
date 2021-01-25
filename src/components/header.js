import React from 'react'
import Link from 'gatsby-link'
import Media from 'react-media'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

const Header = ({ siteTitle }) => (
  <div
    className="header header-fixed header-clear"
    style={{
      backgroundColor: 'var(--nav-bg)',
      backdropFilter: 'saturate(180%) blur(20px)',
      borderBottom: '1px solid var(--border-bottom)',
      boxShadow: '0 0.2rem 1.25rem 0 rgba(27,30,36,.07)',
    }}
  >
    <Media query={{ minWidth: 848 }}>
      {(matches) =>
        matches ? (
          <div className="header-nav" style={{ background: 'transparent' }}>
            <div className="nav-left">
              <div className="nav-item">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: 0,
                    textAlign: 'center',
                    background: 'transparent',
                  }}
                >
                  <ThemeToggler>
                    {({ theme, toggleTheme }) => (
                      <label
                        style={{
                          cursor: 'pointer',
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            toggleTheme(e.target.checked ? 'dark' : 'light')
                          }
                          checked={theme === 'dark'}
                          style={{
                            opacity: 0,
                            position: 'absolute',
                          }}
                        />{' '}
                        {theme === 'dark' ? '🌘' : '☀️'}
                      </label>
                    )}
                  </ThemeToggler>
                  <Link
                    className="header-brand pl-0"
                    to="/"
                    style={{
                      color: 'var(--text-title)',
                      minHeight: 'inherit',
                      textDecoration: 'none',
                      width: 'inherit',
                    }}
                  >
                    <h6 className="font-bold">{siteTitle}</h6>
                  </Link>
                </div>
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
                    paddingTop: '3px',
                    right: 0,
                  }}
                >
                  <div
                    style={{
                      ...burgerPiece,
                      ...{ alignSelf: 'flex-end', width: '15px' },
                    }}
                  />
                  <div style={burgerPiece} />
                  <div style={{ ...burgerPiece, ...{ width: '15px' } }} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="header-nav"
            style={{ background: 'transparent', height: 'inherit' }}
          >
            <div className="nav-center">
              <div className="nav-item p-1">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: 0,
                    textAlign: 'center',
                    background: 'transparent',
                  }}
                >
                  <Link
                    className="header-brand"
                    to="/"
                    style={{
                      color: 'var(--text-title)',
                      minHeight: 'inherit',
                      textDecoration: 'none',
                      width: 'inherit',
                    }}
                  >
                    <h5>{siteTitle}</h5>
                  </Link>
                  <ThemeToggler>
                    {({ theme, toggleTheme }) => (
                      <label
                        style={{
                          cursor: 'pointer',
                          marginLeft: '.5rem',
                          position: 'relative',
                        }}
                      >
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            toggleTheme(e.target.checked ? 'dark' : 'light')
                          }
                          checked={theme === 'dark'}
                          style={{
                            opacity: 0,
                            position: 'absolute',
                          }}
                        />{' '}
                        {theme === 'dark' ? '🌘' : '☀️'}
                      </label>
                    )}
                  </ThemeToggler>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </Media>
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
