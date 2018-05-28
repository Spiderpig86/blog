/**
 * Template for a blog post
 */
import React from 'react'
import Helmet from 'react-helmet'

export default function Template({
    data // Object will be from GraphQL query
}) {
    const post = data.markdownRemark;
    return (
        <div className="blog-post-container">
            <Helmet title={`slim - ${ post.frontmatter.title }`} />
            <div className="blog-post">
                <h1>{ post.frontmatter.title }</h1>

                <div
                    className="blog-post-content"
                    dangerouslySetInnerHTML={{ __html: post.html }} // Gets the html version of the post
                />
            </div>
        </div>
    );
}

// Query our posts and get an object passed in as data for the template above
// Path corresponds to the blog post path we are referring to
// markdownRemark will add the html to the html property of the data object
export const postQuery = graphql`
    query BlogPostByPatch($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                date(formatString: "MM DD, YYYY")
                path
                title
            }
        }
    }
`;