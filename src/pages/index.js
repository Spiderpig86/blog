import React, { Component } from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'

import Layout from '../layouts/index'
import { styles } from '../styles/component-styles/index-styles'

import Prologue from '../components/prologue'

export default class Index extends Component {
  // Note that the data is still sent to props from GraphQL as in old code

  constructor(props) {
    super(props)

    this.state = {
      curTag: 'All',
    }
  }

  /**
   * Help with preprocessing for post tags
   * @param {Post} post
   */
  hasTag(post) {
    return this.state.curTag === 'All'
      ? true
      : post.node.frontmatter.tags.includes(this.state.curTag)
  }

  updateSelectedTag(tag) {
    this.setState({ curTag: tag })
  }

  render() {
    const { edges: posts } = this.props.data.allMarkdownRemark // All the edges will represent the posts

    return (
      <Layout>
        <div className="blog-posts">
          <Prologue
            blogPosts={posts}
            updateSelectedTag={this.updateSelectedTag.bind(this)}
          />
          {posts
            .filter(
              post =>
                post.node.frontmatter.title.length > 0 && this.hasTag(post)
            )
            .map(({ node: post }) => {
              // Generate an list entry for each post
              console.log(post);
              return (
                <div className="blog-post-preview" key={post.id}>
                  <Link to={post.frontmatter.path}>
                    <h1>{post.frontmatter.title}</h1>
                  </Link>
                  <h2
                    style={{
                      color: '#333',
                      fontFamily: 'Montserrat',
                      fontSize: '0.9rem',
                    }}
                  >
                    {post.frontmatter.date}
                  </h2>
                  <h2
                    className="bold"
                    style={{
                      borderLeft: '2px solid #222',
                      color: '#333',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      marginTop: '0rem',
                      paddingLeft: '0.5rem',
                    }}
                  >
                    {post.timeToRead}{' '}
                    {post.timeToRead === 1 ? 'minute' : 'minutes'}
                  </h2>
                  <p>{post.excerpt}</p>

                  <Link className="utb u-LR" style={ styles.readmoreButton } to={post.frontmatter.path}>
                    Read
                  </Link>
                </div>
              )
            })}
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          timeToRead
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            tags
            description
          }
        }
      }
    }
  }
`
