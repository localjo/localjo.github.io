import * as React from 'react'
import { graphql } from 'gatsby'
import moment from 'moment'
import { globalHistory as history } from '@reach/router'

import Page from '../components/Page'
import Terminal from '../components/Terminal'
import IndexLayout from '../layouts'
import ASCII from '../components/ASCII'
import styled from '@emotion/styled'

interface BlogTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: {
          name: string
          email: string
        }
      }
    }
    markdownRemark: {
      html: string
      excerpt: string
      frontmatter: {
        title: string
        date: string
        category: string
      }
    }
  }
}

const Post = styled.div`
  .gatsby-resp-image-figcaption {
    text-align: center;
  }
`

const { location } = history

const BlogTemplate: React.FC<BlogTemplateProps> = ({ data }) => {
  const { category, date, title } = data.markdownRemark.frontmatter
  const { author } = data.site.siteMetadata
  return (
    <IndexLayout>
      <Page>
        <Terminal>
          <ASCII text={`${category} Blog`} />
          <br />
          <h1>{title}</h1>
          <small>
            Published on {moment(date, 'YYYY-MM-DD').format('MMMM Do, YYYY')} by {author.name}
          </small>
          <hr />
          {/* eslint-disable-next-line react/no-danger */}
          <Post dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
          <hr />
          <p>
            Thank you for reading this post.
            <br />
            Please{' '}
            <a
              href={encodeURI(
                `mailto:${author.email}?subject=Your post: ${title}&body=This email is in response to your blog post: ${location.href}\n\nHere are my comments:\n\n`
              )}
            >
              send an email with your comments to {author.email}
            </a>
            .
          </p>
        </Terminal>
      </Page>
    </IndexLayout>
  )
}
export default BlogTemplate

export const query = graphql`
  query BlogTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          email
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        date
        category
      }
    }
  }
`
