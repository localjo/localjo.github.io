import React, { ReactNode } from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

import 'modern-normalize'
import '../styles/normalize'

import LayoutRoot from '../components/LayoutRoot'
import LayoutMain from '../components/LayoutMain'

interface ISEO {
  children?: ReactNode
  description?: string
  lang?: string
  meta?: []
  title?: string
  image?: string
  pathname?: string
}

const IndexLayout: React.FC<ISEO> = ({ children, description = '', lang = 'en', meta = [], image, title, pathname }: ISEO) => {
  const { site } = useStaticQuery(
    graphql`
      query {
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
    `
  )
  const metaTitle = title ? `${title} | ${site.siteMetadata.title}` : site.siteMetadata.title
  const metaDescription = description || site.siteMetadata.description
  const metaImage = image ? `${site.siteMetadata.siteUrl}${image}` : site.siteMetadata.siteImage
  const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : null
  return (
    <LayoutRoot>
      <Helmet
        htmlAttributes={{ lang }}
        title={metaTitle}
        link={canonical ? [{ rel: 'canonical', href: canonical }] : []}
        meta={[
          { name: 'description', content: metaDescription },
          { name: 'keywords', content: site.siteMetadata.keywords },
          { name: 'author', content: site.siteMetadata.author.name },
          { property: 'og:title', content: metaTitle },
          { property: 'og:description', content: metaDescription },
          { property: 'og:image', content: metaImage },
          ...(canonical ? [{ property: 'og:url', content: site.siteMetadata.siteUrl }] : []),
          { name: 'twitter:title', content: site.siteMetadata.title },
          { name: 'twitter:description', content: metaDescription },
          { name: 'twitter:image', content: metaImage },
          { name: 'twitter:card', content: 'summary_large_image' }
        ].concat(meta)}
      />
      <LayoutMain>{children}</LayoutMain>
    </LayoutRoot>
  )
}

export default IndexLayout
