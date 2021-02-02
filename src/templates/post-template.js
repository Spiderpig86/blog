/**
 * Template for a blog post
 */
import React from 'react'
import ReadingProgress from 'react-reading-progress'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'

import Sidebar from '../components/sidebar'
import Layout from '../layouts'
import More from '../components/More/More'
import Meta from '../components/Meta/Meta'
import Share from '../components/Share/Share'
import { siteMetadata } from '../../gatsby-config'

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

  // IMPORTANT: Forces Gatsby to rerender on all layouts. Gatsby preloads layout for 0 or undefined width and messes up page load from external links.
  // Adding in some metadata and text for crawlers to process this better (Google, Facebook, etc)
  // https://stackoverflow.com/questions/58608523/gatsby-react-conditional-rendering-based-on-window-innerwidth-misbehaving/59534680#59534680
  if (typeof window === `undefined`) {
    return (
      <>
        <Meta
          title={`${title} - slim`}
          description={post.frontmatter.description || post.excerpt}
          pathname={location.pathname}
          keywords={
            post.frontmatter.tags.join(',') + ', ' + siteMetadata.keywords
          }
          thumbnail={
            thumbnail ? url + thumbnail : siteMetadata.url + siteMetadata.image
          }
          url={url}
        />

        <h1>{post.frontmatter.title}</h1>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }} // Gets the html version of the post
          id="post-el"
        />
      </>
    )
  }

  // Avoid having utterances plugin render a duplicate component, conditional rendering does not work
  return (
    <Layout>
      <Meta
        title={`${title} - slim`}
        description={post.frontmatter.description || post.excerpt}
        pathname={location.pathname}
        keywords={
          post.frontmatter.tags.join(',') + ', ' + siteMetadata.keywords
        }
        thumbnail={
          thumbnail ? url + thumbnail : siteMetadata.url + siteMetadata.image
        }
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
        <div className="blog-post">
          <h1>{post.frontmatter.title}</h1>

          {post.frontmatter.description && (
            <h4 className="subtitle font-alt font-normal" style={{
              color: 'var(--text-subtitle)'
            }}>
              {post.frontmatter.description}
            </h4>
          )}

          <hr
            style={{
              backgroundColor: 'var(--hr)',
              marginBottom: '3rem',
            }}
          />

          {image && image.childImageSharp && (
            <Img fluid={post.frontmatter.image.childImageSharp.fluid} />
          )}

          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.html }} // Gets the html version of the post
            id="post-el"
          />
        </div>

        <div id="sidebarBottom">
          <Sidebar
            date={post.frontmatter.date}
            duration={post.timeToRead}
            tags={post.frontmatter.tags}
            sticky={false}
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

      <div id="sidebar" style={{ minWidth: '300px' }}>
        <Sidebar
          date={post.frontmatter.date}
          duration={post.timeToRead}
          tags={post.frontmatter.tags}
          sticky={true}
        />
      </div>
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
