module.exports = {
  siteMetadata: {
    title: `Slim Blog`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`, // To modify head tags
    `gatsby-plugin-catch-links`, // Intercepts links from markdown to avoid refreshes
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`, // Store markdown posts here,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`, // Markdown to HTML,
      options: {
        plugins: [
          `gatsby-remark-emoji`, // <-- this line adds emoji
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              target: `_blank`,
              rel: `noopener noreferrer`,
            },
          },
          {
            // should be placed after gatsby-remark-autolink-headers
            resolve: `gatsby-remark-prismjs`,
            options: {
              inlineCodeMarker: `›`,
            },
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
  ],
  pathPrefix: `/blog`, // For setting up in github pages
}
