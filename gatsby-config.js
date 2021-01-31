const config = require('./config')

module.exports = {
  siteMetadata: {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    url: config.url,
    siteUrl: config.url,
    copyright: config.copyright,
    author: config.author,
    image: config.image,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-gtag`, // note this instead of gatsby-plugin-react-helmet
      options: {
        trackingId: 'G-7L9VLT78VG',
        head: true, // note this is TRUE and not FALSE as listed in other examples above
        anonymize: false,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'slim',
        short_name: 'slim',
        start_url: '/',
        background_color: '#6b37bf',
        theme_color: '#6b37bf',
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: 'standalone',
        // icon: "src/images/icon.png", // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`,
        icon: `static/images/logo.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`, // To modify head tags
    `gatsby-plugin-catch-links`, // Intercepts links from markdown to avoid refreshes
    `gatsby-plugin-advanced-sitemap`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: ['node_modules'],
      },
    },
    `gatsby-plugin-twitter`,
    `gatsby-plugin-dark-mode`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`, // Store markdown posts here,
        name: `pages`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                site_url: url
                title
                description
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map((edge) => ({
                ...edge.node.frontmatter,
                description: edge.node.frontmatter.description,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                custom_elements: [{ 'content:encoded': edge.node.html }],
              })),
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  edges {
                    node {
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                        description
                        tags
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: config.title,
          },
        ],
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
  ],
  // pathPrefix: `/blog`, // For setting up in github pages
}
