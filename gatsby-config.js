const config = require('./config')

module.exports = {
  siteMetadata: {
    title: config.title,
    description: config.description,
    keyword: config.keyword,
    url: config.url,
    siteUrl: config.url
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'slim',
        short_name: "slim",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        // icon: "src/images/icon.png", // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`,
      },
    },
    `gatsby-plugin-offline`,
  ],
  pathPrefix: `/blog`, // For setting up in github pages
}
