import React, { useState, useEffect } from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import ColorHash from 'color-hash'

import Layout from '../layouts/index'
import Prologue from '../components/prologue'
import siteConfig from '../../config'
import Pagination from '../components/Pagination/Pagination'
import Meta from '../components/Meta/Meta'
import useSiteMetadata from '../hooks/use-site-metadata'

import 'cirrus-ui/src/core/spacing.scss'
import 'cirrus-ui/src/core/utils/misc.scss'
import { styles } from '../styles/component-styles/sidebar-styles'

export default (props) => {
  const { edges: posts } = props.data.allMarkdownRemark // All the edges will represent the posts

  const [curTag, setCurTag] = useState('All')
  const [currentPage, setCurrentPage] = useState(0)
  const [numPages, setNumPages] = useState(0)
  const [filteredPosts, setFilteredPosts] = useState(posts)

  const siteMetadata = useSiteMetadata()

  /**
   * Help with preprocessing for post tags
   * @param {Post} post
   */
  function hasTag(post) {
    return curTag === 'All' ? true : post.node.frontmatter.tags.includes(curTag)
  }

  function updateSelectedTag(tag) {
    // Reset current page as well
    setCurrentPage(0)
    setCurTag(tag)
  }

  function updateSelectedPage(page) {
    setCurrentPage(page)
  }

  function filterPosts() {
    // Filter posts by selected tag and paginate it
    if (posts) {
      setFilteredPosts(
        posts.filter(
          (post) => post.node.frontmatter.title.length > 0 && hasTag(post)
        )
      )
    }
  }

  useEffect(() => {
    filterPosts()
  }, [curTag, currentPage])

  useEffect(() => {
    // Run when filteredPosts gets updated
    setNumPages(Math.ceil(filteredPosts.length / siteConfig.postsPerPage))
  }, [filteredPosts])

  return (
    <Layout>
      <Meta
        title={siteMetadata.title}
        description={siteMetadata.description}
        pathname={''}
        keywords={siteMetadata.keywords}
        thumbnail={siteMetadata.url + siteMetadata.image}
        url={siteMetadata.url}
      />
      <div className="blog-posts">
        <Prologue blogPosts={posts} updateSelectedTag={updateSelectedTag} />
        {filteredPosts
          .slice(
            currentPage * siteConfig.postsPerPage,
            Math.min((currentPage + 1) * siteConfig.postsPerPage, posts.length)
          )
          .map(({ node: post }) => {
            // Generate an list entry for each post
            return (
              <div className="blog-post-preview" key={post.id}>
                <Link to={post.frontmatter.path}>
                  <h2>{post.frontmatter.title}</h2>
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
            currentPage={currentPage}
            numPages={numPages}
            updateSelectedPage={updateSelectedPage}
          />
        </div>
      </div>
    </Layout>
  )
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
