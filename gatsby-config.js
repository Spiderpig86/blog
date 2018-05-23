module.exports = {
  siteMetadata: {
    title: `The Blog`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`, // To modify head tags
    `gatsby-plugin-catch-links`, // Intercepts links from markdown to avoid refreshes
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`, // Store markdown posts here,
        name: 'pages'
      }
    },
    `gatsby-transformer-remark` // Markdown to HTML
  ],
}
