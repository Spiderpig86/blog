/**
 * Template for a blog post
 */
import React from 'react'
import Helmet from 'react-helmet'
import Media from 'react-media';

import Sidebar from '../components/sidebar'

export default function Template({
    data // Object will be from GraphQL query
}) {
    const post = data.markdownRemark;
    return (
        <div className="blog-post-container" style={{ display: 'flex' }}>
            <div style={{ flex: 2.5, paddingRight: "2rem" }}>
                <Helmet title={`slim - ${ post.frontmatter.title }`} />
                <div className="blog-post">
                    <h1>{ post.frontmatter.title }</h1>

                    <div
                        className="blog-post-content"
                        dangerouslySetInnerHTML={{ __html: post.html }} // Gets the html version of the post
                    />
                </div>
            </div>
            

            <Media query="(min-width: 848px)">
                {(
                    matches // Inline function for checking if rules match above (less than 848px)
                ) =>
                matches ? (
                    <div style={{ flex: 1 }}>
                        <Sidebar
                            date={ post.frontmatter.date }
                            duration={ post.timeToRead }
                            tags={ post.frontmatter.tags }
                        />
                    </div>
                ) : (
                    <div></div>
                )
            }
            </Media>
        </div>
    );
}

// Query our posts and get an object passed in as data for the template above
// Path corresponds to the blog post path we are referring to
// markdownRemark will add the html to the html property of the data
export const postQuery = graphql`
    query BlogPostByPatch($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            tableOfContents
            timeToRead
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                path
                tags
                title
            }
        }
    }
`;