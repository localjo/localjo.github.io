'use strict'

module.exports = {
  siteMetadata: {
    title: 'Jo Sprague - Software Engineer',
    description: `I work with JavaScript/TypeScript, React, Python and related tools and frameworks. I'm interested in working with teams that have a mission or product I'm passionate about.`,
    keywords: 'javascript, typescript, react, python, humanitarian',
    siteUrl: 'https://iamlocaljo.com',
    siteImage: 'https://iamlocaljo.com/social.png',
    author: {
      name: 'Jo Sprague',
      url: 'https://iamlocaljo.com',
      email: 'josiah.sprague@gmail.com'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`
      }
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jo Sprague's Portfolio`,
        short_name: `JS Portfolio`,
        start_url: `/`,
        background_color: `#AFB2B7`,
        theme_color: `#AFB2B7`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`
      }
    },
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en'
      }
    },
    'gatsby-plugin-webpack-bundle-analyzer',
    {
      resolve: 'gatsby-plugin-fathom',
      options: {
        trackingUrl: 'cdn.usefathom.com',
        siteId: 'NACYXQJM',
        whitelistHostnames: ['iamlocaljo.com']
      }
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Fira Code:400,700']
        }
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-attr',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 100,
              wrapperStyle: 'margin-left: 0!important; margin-right: 10px !important;',
              linkImagesToOriginal: false,
              showCaptions: ['title'],
              withWebp: true
            }
          }
        ]
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://iamlocaljo.com'
      }
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet'
  ]
}
