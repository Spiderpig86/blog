import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../layouts'
import TagPreview from '../components/TagPreview/TagPreview';

const Tags = props => {
  const posts = props.data.allMarkdownRemark.edges
  const { tag } = props.pageContext

  return (
    <Layout>
      <div>
        <h1>{`Available posts in '${tag}'`}</h1>
        <h3><Link to={ `/tags` }>Go back to all tags.</Link></h3>
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
