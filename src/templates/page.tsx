import React from 'react'
import { graphql } from 'gatsby'

import Page from '../components/Page'
import Terminal from '../components/Terminal'
import IndexLayout from '../layouts'
import ASCII from 'react-rainbow-ascii'

interface PageTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: {
          name: string
          url: string
        }
      }
    }
    markdownRemark: {
      html: string
      excerpt: string
      frontmatter: {
        title: string
      }
      fields: {
        slug: string
      }
    }
  }
}

const PageTemplate: React.FC<PageTemplateProps> = ({ data }) => {
  const { fields, frontmatter, excerpt, html } = data.markdownRemark
  const meta = {
    pathname: fields.slug,
    title: frontmatter.title,
    description: excerpt
  }
  return (
    <IndexLayout {...meta}>
      <Page>
        <Terminal isMax={fields.slug === '/code-demos/'}>
          <ASCII text={frontmatter.title} fallback="h1" />
          <br />
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Terminal>
      </Page>
    </IndexLayout>
  )
}
export default PageTemplate

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
