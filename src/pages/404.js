import React from 'react'
import Meta from '../components/Meta/Meta'
import useSiteMetadata from '../hooks/use-site-metadata'

export const NotFoundPage = () => {
  const siteMetadata = useSiteMetadata()

  return (
    <div>
      <Meta
        title={siteMetadata.title}
        description={siteMetadata.description}
        pathname={''}
        keywords={siteMetadata.keywords}
        thumbnail={siteMetadata.url + siteMetadata.image}
        url={siteMetadata.url}
      />
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  )
}

export default NotFoundPage
