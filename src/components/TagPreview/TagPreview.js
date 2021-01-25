/**
 * Display previews for listing posts by tag
 */

import React from 'react'
import Link from 'gatsby-link'
import 'cirrus-ui/src/core/spacing.scss';

const TagPreview = ({ post }) => (
  <div className="py-2">
    <Link to={ post.frontmatter.path }><h1>{post.frontmatter.title}</h1></Link>
    <h2
      style={{
        color: 'var(--text-normal)',
        fontFamily: 'Montserrat',
        fontSize: '0.9rem',
      }}
    >
      {post.frontmatter.date}
    </h2>
    <h2
      className="font-bold"
      style={{
        borderLeft: '2px solid var(--text-normal)',
        color: 'var(--text-normal)',
        fontSize: '0.9rem',
        fontWeight: 700,
        marginTop: '0rem',
        paddingLeft: '0.5rem',
      }}
    >
      {post.timeToRead} {post.timeToRead === 1 ? 'minute' : 'minutes'}
    </h2>
    <p>{post.frontmatter.description || post.excerpt}</p>
  </div>
)

export default TagPreview
