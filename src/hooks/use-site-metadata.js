import { useStaticQuery, graphql } from 'gatsby'

/**
 * Not used at the moment. May need it soon.
 */
const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            author {
              name
              bio
              contacts {
                facebook
                linkedin
                github
                twitter
                telegram
                instagram
                email
                rss
                vkontakte
                line
                gitlab
                weibo
                codepen
                youtube
                soundcloud
                medium
              }
            }
            url
            title
            description
            copyright
            image
          }
        }
      }
    `
  )

  return site.siteMetadata
}

export default useSiteMetadata
