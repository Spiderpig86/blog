import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import '../styles/blog-listing.css'

export default function Index({ data }) {
    const { edges: posts }  = data.allMarkdownRemark; // All the edges will represent the posts
    return (
        <div className="blog-posts">
            { posts
                .filter(post => post.node.frontmatter.title.length > 0)
                .map(({ node: post }) => { // Generate an list entry for each post
                    return (
                        <div className="blog-post-preview" key={post.id}>
                            <Link to={post.frontmatter.path}>
                                <h1>{  post.frontmatter.title }</h1>
                            </Link>
                            <h2>{ post.frontmatter.date }</h2>
                            <p>{ post.excerpt }</p>
                        </div>
                    );
                })
            }
        </div>
    );
}

export const pageQuery = graphql`
    query IndexQuery {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
            edges {
                node {
                    excerpt(pruneLength: 250)
                    id
                    frontmatter {
                        title
                        date(formatString: "MMMM DD, YYYY")
                        path
                    }
                }
            }
        }
    }
`;