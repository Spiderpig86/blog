/**
 * Page for showing all tags and count
 */
import React from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'

import Layout from '../layouts'

const TagList = props => {
  const data = props.data.allMarkdownRemark.group

  return (
    <Layout>
      <div className="tags">
        <h1>All Tags</h1>
        <p>Have fun exploring! 🐤</p>
        <ul>
          {data.map((tag, i) => (
            <li key={i}>
              <Link to={`/tag/${tag.fieldValue}`}>
                {tag.fieldValue} {`(${tag.totalCount})`}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default TagList;

export const tagsQuery = graphql`
  query TagQuery {
    allMarkdownRemark(filter: {}, limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
