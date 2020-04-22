import * as React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import 'modern-normalize'
import '../styles/normalize'

import LayoutRoot from '../components/LayoutRoot'
import LayoutMain from '../components/LayoutMain'

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string
      description: string
      keywords: string
      siteUrl: string
      siteImage: string
      author: {
        name: string
      }
    }
  }
}

const IndexLayout: React.FC = ({ children }) => (
  <StaticQuery
    query={graphql`
      query IndexLayoutQuery {
        site {
          siteMetadata {
            title
            description
            keywords
            siteUrl
            siteImage
            author {
              name
            }
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => (
      <LayoutRoot>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description },
            { name: 'keywords', content: data.site.siteMetadata.keywords },
            { name: 'author', content: data.site.siteMetadata.author.name },
            { property: 'og:title', content: data.site.siteMetadata.title },
            { property: 'og:description', content: data.site.siteMetadata.description },
            { property: 'og:image', content: data.site.siteMetadata.siteImage },
            { property: 'og:url', content: data.site.siteMetadata.siteUrl },
            { name: 'twitter:title', content: data.site.siteMetadata.title },
            { name: 'twitter:description', content: data.site.siteMetadata.description },
            { name: 'twitter:image', content: data.site.siteMetadata.siteImage },
            { name: 'twitter:card', content: 'summary_large_image' }
          ]}
        />
        <LayoutMain>{children}</LayoutMain>
      </LayoutRoot>
    )}
  />
)

export default IndexLayout
