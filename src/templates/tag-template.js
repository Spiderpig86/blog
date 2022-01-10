import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../layouts'
import TagPreview from '../components/TagPreview/TagPreview';
import Meta from '../components/Meta/Meta';
import useSiteMetadata from '../hooks/use-site-metadata';

const Tags = props => {
  const posts = props.data.allMarkdownRemark.edges
  const siteMetadata = useSiteMetadata()
  const { tag } = props.pageContext

  return (
    <Layout>
        <Meta
          title={`Tags ${tag} - slim`}
          description={siteMetadata.description + ' Display all tags on blog'}
          pathname={''}
          keywords={siteMetadata.keywords}
          thumbnail={siteMetadata.url + siteMetadata.image}
          url={siteMetadata.url}
        />

      <div>
        <h3>{`Available posts in '${tag}'`}</h3>
        <h6><Link to={ `/tags` }>◀ Go back to all tags.</Link></h6>
        <div className="tags">
          {posts.map(({ node }, i) => (
            <TagPreview post={ node } key={ i } />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Tags

export const query = graphql`
  query Tagsquery($tag: String!) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { eq: $tag } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          timeToRead
          frontmatter {
            title
            path
            date(formatString: "MMMM DD, YYYY")
            description
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
