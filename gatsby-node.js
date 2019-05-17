/**
 * Implement Gatsby's Node APIs in this file.
 * Use the Node API to create dynamic pages from blog posts
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 // You can delete this file if you're not using it

const path = require('path');
const graphql = require('gatsby/graphql')

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;

    const blogPostTemplate = path.resolve(`src/templates/post.js`);

    return graphql(`{
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            limit: 1000
        ) {
            edges {
                node {
                    excerpt(pruneLength: 250)
                    html
                    id
                    frontmatter {
                        date
                        path
                        title
                    }
                }
            }
        }
    }`)
    .then(result => {
        if (result.errors) {
            return Promise.reject(result.errors); // The request pooped out on me
        }

        result.data.allMarkdownRemark.edges
            .forEach(({ node }) => {
                createPage({
                    path: node.frontmatter.path, // Create a page with specified path
                    component: blogPostTemplate, // Template we want to use
                    context: {} // Additional data for creating the page
                });
            });
    });
}