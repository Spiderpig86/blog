import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../layouts'

const Tags = props => {
  const posts = props.data.allMarkdownRemark.edges
  const { tag } = props.pageContext

  return (
    <Layout>
      <h1>{`Available posts in ${tag}`}</h1>
      <div className="tags">
        {posts.map(({ node }, i) => (
          <Link to={node.frontmatter.path} key={i}>
            {node.frontmatter.title}
          </Link>
        ))}
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
          frontmatter {
            title
            path
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
