/**
 * Page for showing all tags and count
 */
import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

const Tags = () => (
  <div>
    <h1>Tags</h1>
  </div>
)

export const tagsQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(filter: {}) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

export default Tags
