/**
 * Template for a blog post
 */
import React from 'react'
import Helmet from 'react-helmet'
import Media from 'react-media'
import ReadingProgress from 'react-reading-progress'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'

import Sidebar from '../components/sidebar'
import Layout from '../layouts'
import More from '../components/More/More'
import Meta from '../components/Meta/Meta'
import Share from '../components/Share/Share'

export default function Template({
  data, // Object will be from GraphQL query
  pageContext,
  location,
}) {
  const post = data.markdownRemark
  const { prev, next } = pageContext

  // Metadata
  const url = data.site.siteMetadata.siteUrl
  const thumbnail =
    post.frontmatter.image && post.frontmatter.image.childImageSharp.resize.src
  const { title, image } = post.frontmatter

  // Avoid having utterances plugin render a duplicate component, conditional rendering does not work

  return (
    <Layout>
        <Meta
          title={title}
          description={post.frontmatter.description || post.excerpt}
          pathname={location.pathname}
          keywords={post.frontmatter.tags.join(',')}
          thumbnail={thumbnail && url + thumbnail}
          url={url}
        />

        <ReadingProgress
          targetEl="#post-container"
          style={{
            borderColor: 'transparent',
            color: '#000',
            height: '0.25rem',
            zIndex: '100',
          }}
        />
        <div style={{ paddingRight: '2rem', maxWidth: '100%', minWidth: 0 }}>
          <Helmet title={`slim - ${post.frontmatter.title}`} />
          <div className="blog-post">
            <h1>
              {post.frontmatter.title}
            </h1>

            {post.frontmatter.description ? (
              <h2 className="subtitle">{post.frontmatter.description}</h2>
            ) : null}

            <hr
              style={{
                backgroundColor: 'var(--hr)',
                marginBottom: '3rem',
              }}
            />

            {image && image.childImageSharp ? (
              <Img fluid={post.frontmatter.image.childImageSharp.fluid} />
            ) : null}

            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: post.html }} // Gets the html version of the post
              id="post-el"
            />
          </div>

          <hr
            style={{
              backgroundColor: 'var(--hr)',
              marginBottom: '3rem',
            }}
          />

          <Share postTitle={title} postUrl={url} pathName={location.pathname} />

          <More prev={prev && prev.node} next={next && next.node} />

          <hr
            style={{
              backgroundColor: 'var(--hr)',
              marginBottom: '3rem',
            }}
          />

          <div
            ref={(elem) => {
              if (!elem) {
                return
              }
              if (document.querySelector('.utterances')) {
                document.querySelector('.utterances').remove()
              }
              const scriptElem = document.createElement('script')
              scriptElem.src = 'https://utteranc.es/client.js'
              scriptElem.async = true
              scriptElem.crossOrigin = 'anonymous'
              scriptElem.setAttribute('repo', 'Spiderpig86/blog')
              scriptElem.setAttribute('issue-term', 'pathname')
              scriptElem.setAttribute('label', '💬 blog-comment')
              scriptElem.setAttribute('theme', 'github-light')
              elem.appendChild(scriptElem)
            }}
          ></div>
        </div>

        <Media query="(min-width: 848px)">
          {(
            matches // Inline function for checking if rules match above (less than 848px)
          ) =>
            matches ? (
              <div style={{ minWidth: "300px" }}>
                <Sidebar
                  date={post.frontmatter.date}
                  duration={post.timeToRead}
                  tags={post.frontmatter.tags}
                />
              </div>
            ) : (
              <div />
            )
          }
        </Media>
    </Layout>
  )
}

// Query our posts and get an object passed in as data for the template above
// Path corresponds to the blog post path we are referring to
// markdownRemark will add the html to the html property of the data
// NOTE: tableOfContents field removed
export const postQuery = graphql`
  query BlogPostByPatch($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      timeToRead
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        title
        image {
          childImageSharp {
            resize(width: 1500, height: 1500) {
              src
            }
            fluid(maxWidth: 848) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        description
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
