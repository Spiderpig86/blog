import React from 'react'
import Link from 'gatsby-link'
import Media from 'react-media'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

const Header = ({ siteTitle }) => (
  <div
    className="header header-fixed header-clear"
    style={{
      backgroundColor: 'var(--nav-bg)',
      backdropFilter: 'blur(5px)',
      borderBottom: '1px solid var(--border-bottom)',
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
        {(matches) =>
          matches ? (
            <div className="header-nav" style={{ background: 'transparent' }}>
              <div className="nav-left">
                <div className="nav-item">
                  <h1
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
                      className="header-brand"
                      to="/"
                      style={{
                        color: 'var(--text-title)',
                        textDecoration: 'none',
                        width: 'inherit',
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
            <div className="header-nav" style={{ background: 'transparent' }}>
              <div className="nav-center">
                <div className="nav-item">
                  <h1
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
                        textDecoration: 'none',
                        width: 'inherit',
                      }}
                    >
                      {siteTitle}
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
