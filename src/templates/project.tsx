import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import { globalHistory as history } from '@reach/router'
import Quotable from 'quotable-toolbar'
import Img from 'gatsby-image'

import Page from '../components/Page'
import Terminal from '../components/Terminal'
import IndexLayout from '../layouts'
import ASCII from 'react-rainbow-ascii'
import styled from '@emotion/styled'
import { colors } from '../styles/variables'
import { FluidObject } from 'gatsby-image'

interface ProjectTemplateProps {
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
        description: string
        date: string
        category: string
        technologies: string[]
        featuredImage?: {
          childImageSharp: {
            fluid: FluidObject
          }
        }
        links: [
          {
            title: string
            url: string
            color?: string
          }
        ]
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

const ProjectTemplate: React.FC<ProjectTemplateProps> = ({ data }) => {
  const { category, title, technologies, links, description } = data.markdownRemark.frontmatter
  const featuredImgFluid = data.markdownRemark.frontmatter.featuredImage?.childImageSharp.fluid
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
        hashtags: ['OpenSource', 'Quotable']
      }
    })
    quotableToolbar.activate()
    return () => {
      quotableToolbar.deactivate()
    }
  }, [])
  const pageTitle = `${category} Projects`
  return (
    <IndexLayout title={pageTitle}>
      <Page>
        <Terminal>
          <ASCII text={title} fallback="h1" />
          <blockquote>{description}</blockquote>
          {featuredImgFluid && <Img fluid={featuredImgFluid} />}
          <br />
          <p>
            {technologies.map(tech => {
              const slug = tech.replace(/[^a-zA-Z\d]/g, '').toLowerCase()
              return (
                <span key={tech}>
                  <span className={`badge ${slug}`}>{tech}</span>{' '}
                </span>
              )
            })}
          </p>
          <hr />
          {/* eslint-disable-next-line react/no-danger */}
          <Post className="blog-post" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
          <hr />
          <h2 id="#project-links">Project links:</h2>
          <p>
            {links.map(link => {
              const { url, title, color = '' } = link
              return (
                <span key={url}>
                  <a className={`badge ${color.toLowerCase()}`} href={url} target="_blank">
                    {title}
                  </a>{' '}
                </span>
              )
            })}
          </p>
          <hr />
          <p>
            Thank you for reading about this project. Please{' '}
            <a
              href={encodeURI(
                `mailto:${author.email}?subject=Your post: ${title}&body=I am writing this email about your project: ${location.href}\n\nHere are my comments:\n\n`
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
export default ProjectTemplate

export const query = graphql`
  query ProjectTemplateQuery($slug: String!) {
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
        description
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1140) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        date(formatString: "MMMM Do, YYYY")
        category
        technologies
        links {
          title
          url
          color
        }
      }
    }
  }
`
