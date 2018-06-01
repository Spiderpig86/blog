import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <div
    className='header header-fixed'
    style={{
      background: '#fff',
      marginBottom: '3rem',
      borderBottom: '2px solid #e6e6e6',
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
            <img
              src="https://lh3.googleusercontent.com/DhOadha-kqTL8fj-HaI9fmRr59L4liJGqOB4-jHNUCWOnss14wMZ--VbBXSuR_ld9zA=w300" 
              style={{
                height: '100%',
                width: '60px',
                margin: 0,
                background: 'transparent',
              }}  
            />
          </div>
        </div>
        <div className="nav-center">
          <div className="nav-item">
            <h1 style={{ margin: 0, textAlign: 'center', background: 'transparent' }}>
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
        <div className="nav-right">
          
        </div>
      </div>
    </div>
  </div>
)

export default Header
