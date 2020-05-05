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
  const meta = {
    title: data.markdownRemark.frontmatter.title,
    description: data.markdownRemark.excerpt
  }
  return (
    <IndexLayout {...meta}>
      <Page>
        <Terminal isMax={data.markdownRemark.frontmatter.title.toLowerCase() === 'code demos'}>
          <ASCII text={data.markdownRemark.frontmatter.title} fallback="h1" />
          <br />
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
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
