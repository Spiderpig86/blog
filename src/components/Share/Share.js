/**
 * Sharing is caring folks
 */
import React from 'react'

import styles from './Share.module.scss'
import { SHARE_LINKS } from '../../consts'

const Share = ({ title, postTitle, postUrl, pathName }) => {

  pathName = pathName.replace('/', '')

  const fbUrl = `${SHARE_LINKS.FACEBOOK}${postUrl}${pathName}`
  const twitterUrl = `${SHARE_LINKS.TWITTER}${postUrl}${pathName}&text=${postTitle} by @hudididudidi`
  const linkedinUrl = `${SHARE_LINKS.LINKEDIN}${postUrl}${pathName}`
  const redditUrl = `${SHARE_LINKS.REDDIT}${postUrl}${pathName}&title=${postTitle}`

  return (
    <div>
      <h3>{title || 'Sharing is caring.'}</h3>
      <div>
        <ShareButton network="facebook" url={ fbUrl } />
        <ShareButton network="twitter" url={ twitterUrl } />
        <ShareButton network="linkedin" url={ linkedinUrl } />
        <ShareButton network="reddit" url={ redditUrl } />
      </div>
    </div>
  )
}

const ShareButton = ({ network, url }) => (
  <a rel="noopener noreferrer" href={ url } target="__blank" className={styles[`share__${network}`]}>
    <span>
      <i className={`fa fa-${network}-square`} />
    </span>
  </a>
)

export default Share

const capitalize = s => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
