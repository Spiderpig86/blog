import React, { Component } from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import ColorHash from 'color-hash'
import Helmet from 'react-helmet'

import Layout from '../layouts/index'
import Prologue from '../components/prologue'
import siteConfig from '../../config'
import Pagination from '../components/Pagination/Pagination'

import 'cirrus-ui/src/core/spacing.scss'
import 'cirrus-ui/src/core/utils/misc.scss'
import { styles } from '../styles/component-styles/sidebar-styles'

export default class Index extends Component {
  // Note that the data is still sent to props from GraphQL as in old code
  constructor(props) {
    super(props)

    this.state = {
      curTag: 'All',
      currentPage: 0,
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
    // Reset current page as well
    this.setState({ currentPage: 0, curTag: tag })
  }

  updateSelectedPage(page) {
    this.setState({
      currentPage: page,
    })
  }

  componentDidMount() {
    const totalCount = this.props.data.allMarkdownRemark.edges.length
    this.setState({
      numPages: Math.ceil(totalCount / siteConfig.postsPerPage),
    })
  }

  render() {
    const { edges: posts } = this.props.data.allMarkdownRemark // All the edges will represent the posts

    // Filter posts by selected tag and paginate it
    let filteredPosts = []

    if (posts) {
      filteredPosts = posts.filter(
        (post) => post.node.frontmatter.title.length > 0 && this.hasTag(post)
      )
    }

    const numPages = Math.ceil(filteredPosts.length / siteConfig.postsPerPage)

    return (
      <Layout>
        <Helmet title={'💎 slim.'} />
        <div className="blog-posts">
          <Prologue
            blogPosts={posts}
            updateSelectedTag={this.updateSelectedTag.bind(this)}
          />
          {filteredPosts
            .slice(
              this.state.currentPage * siteConfig.postsPerPage,
              Math.min(
                (this.state.currentPage + 1) * siteConfig.postsPerPage,
                posts.length
              )
            )
            .map(({ node: post }) => {
              // Generate an list entry for each post
              return (
                <div className="blog-post-preview" key={post.id}>
                  <Link to={post.frontmatter.path}>
                    <h1>{post.frontmatter.title}</h1>
                  </Link>
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
                    className="bold"
                    style={{
                      borderLeft: '2px solid var(--text-normal)',
                      color: 'var(--text-normal)',
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

                  {post.frontmatter.tags.map((tag, i) => {
                    const colorHash = new ColorHash({ lightness: 0.5 })
                    const color = colorHash.hex(tag)

                    return (
                      <Link
                        to={`/tag/${tag}`}
                        style={{
                          ...styles.tagStyle,
                          backgroundColor: color,
                          color: '#fff',
                        }}
                        key={i}
                      >
                        {tag}
                      </Link>
                    )
                  })}
                </div>
              )
            })}
          <div className="u-center mb-16">
            <Pagination
              currentPage={this.state.currentPage}
              numPages={numPages}
              updateSelectedPage={this.updateSelectedPage.bind(this)}
            />
          </div>
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
