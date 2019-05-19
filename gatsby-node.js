/**
 * Implement Gatsby's Node APIs in this file.
 * Use the Node API to create dynamic pages from blog posts
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 // You can delete this file if you're not using it

const path = require('path');
const graphql = require('gatsby/graphql')
const { createFilePath, createFileNode } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        
        createNodeField({
            node,
            name: `slug`,
            value: slug
        });
    }
}

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
                    fields {
                      slug
                    }
                    frontmatter {
                        date
                        path
                        title
                        description
                    }
                }
            }
        }
    }`)
    .then(result => {
        if (result.errors) {
            return Promise.reject(result.errors); // The request pooped out on me
        }

        const posts = result.data.allMarkdownRemark.edges
        posts
            .forEach(({ node }, index) => {
                createPage({
                    path: node.frontmatter.path, // Create a page with specified path
                    component: blogPostTemplate, // Template we want to use
                    context: {
                        slug: node.fields.slug,
                        prev: posts[index + 1] || null,
                        next: posts[index - 1] || null,
                    } // Additional data for creating the page
                });
            });
    });
}