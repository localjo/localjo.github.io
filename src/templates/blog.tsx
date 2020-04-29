import React, { useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import { globalHistory as history } from '@reach/router'
import Quotable from 'quotable-toolbar'

import Page from '../components/Page'
import Terminal from '../components/Terminal'
import IndexLayout from '../layouts'
import ASCII from 'react-rainbow-ascii'
import styled from '@emotion/styled'
import { colors } from '../styles/variables'

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
  position: relative;
  .gatsby-resp-image-figcaption {
    text-align: center;
  }
  #quotable-toolbar .quotable-link {
    color: ${colors.ui.terminal} !important;
  }
`

const { location } = history

const BlogTemplate: React.FC<BlogTemplateProps> = ({ data }) => {
  const { category, date, title } = data.markdownRemark.frontmatter
  const { author } = data.site.siteMetadata
  useEffect(() => {
    const quotableToolbar = new Quotable({
      selector: `.blog-post`,
      isActive: {
        blockquotes: true,
        textSelection: true
      },
      url: location.href,
      twitter: {
        via: 'JoFromAkron',
        related: 'JoFromAkron',
        hashtags: ['quotable']
      }
    })
    quotableToolbar.activate()
    return () => {
      quotableToolbar.deactivate()
    }
  }, [])
  return (
    <IndexLayout>
      <Page>
        <Terminal>
          <ASCII text={`${category} Blog`} fallback="h2" />
          <p>
            <Link to={`${category.toLowerCase()}-blog`}>« go back to {category} Blog index</Link>
          </p>
          <br />
          <h1>{title}</h1>
          <small>
            Published on {date} by {author.name}
          </small>
          <hr />
          {/* eslint-disable-next-line react/no-danger */}
          <Post className="blog-post" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
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
          <p>
            <Link to={`${category.toLowerCase()}-blog`}>« go back to {category} Blog index</Link>
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
        date(formatString: "MMMM Do, YYYY")
        category
      }
    }
  }
`
