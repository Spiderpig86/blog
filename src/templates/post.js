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
import Layout from '../layouts/index'

export default function Template({
  data, // Object will be from GraphQL query
}) {
  const post = data.markdownRemark
  return (
    <Layout>
      <div className="blog-post-container" style={{ display: 'flex' }}>
        <ReadingProgress
          targetEl="#post-el"
          style={{
            borderColor: 'transparent',
            color: '#000',
            height: '0.25rem',
            zIndex: '100',
          }}
        />
        <div style={{ flex: 2.5, paddingRight: '2rem', maxWidth: '100%' }}>
          <Helmet title={`slim - ${post.frontmatter.title}`} />
          <div className="blog-post">
            <h1
              style={{
                fontSize: '3rem',
              }}
            >
              {post.frontmatter.title}
            </h1>

            {
              post.frontmatter.description ?
              <h2 className="subtitle">{ post.frontmatter.description }</h2>
              : null
            }

            
            <hr
              style={{
                backgroundColor: '#ddd',
                marginBottom: '3rem',
              }}
            />
            
              {
                post.frontmatter.image && post.frontmatter.image.childImageSharp ?
                  <Img fluid={ post.frontmatter.image.childImageSharp.fluid} />
                  : null
              }

            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: post.html }} // Gets the html version of the post
              id="post-el"
            />
          </div>
        </div>

        <Media query="(min-width: 848px)">
          {(
            matches // Inline function for checking if rules match above (less than 848px)
          ) =>
            matches ? (
              <div style={{ flex: 1 }}>
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
  }
`
