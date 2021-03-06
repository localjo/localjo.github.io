import * as React from 'react'
import { Link, graphql } from 'gatsby'

import Page from '../components/Page'
import Terminal from '../components/Terminal'
import IndexLayout from '../layouts'
import ASCII from 'react-rainbow-ascii'
import Img, { FixedObject } from 'gatsby-image'

interface CodeDemosIndexProps {
  data: {
    allMarkdownRemark: {
      nodes: [
        {
          fields: {
            slug: string
          }
          html: string
          excerpt: string
          frontmatter: {
            title: string
            description: string
            date: string
            category: string
            technologies: string[]
            thumbnail?: {
              childImageSharp: {
                fixed: FixedObject
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
      ]
    }
  }
}

const CodeDemosIndex: React.FC<CodeDemosIndexProps> = ({ data }) => {
  return (
    <IndexLayout title="Code Demos">
      <Page>
        <Terminal title="/code-demos" isMax={true}>
          <ASCII text="Code Demos" fallback="h1" />
          <br />
          <p>
            The projects on this page show a sample of my coding abilities with different technologies. I often build these to learn about a
            new technology, or as examples to use to mentor other developers. Some of these are quite old, dating back all the way to the
            beginning of my career. I'm happy to discuss these demos more in depth.
          </p>
          <div className="tile-list">
            {data.allMarkdownRemark.nodes.map(project => {
              const { fields, frontmatter, excerpt } = project
              const { title, technologies, links, thumbnail, description } = frontmatter
              return (
                <div key={fields.slug} className="project tile">
                  <h2>{title}</h2>
                  <p>{thumbnail && <Img fixed={thumbnail.childImageSharp.fixed} />}</p>
                  <ul>
                    {links.map(link => {
                      const { url, title, color = '' } = link
                      return (
                        <li key={url}>
                          <a className={`badge ${color.toLowerCase()}`} href={url} target="_blank">
                            {title}
                          </a>{' '}
                        </li>
                      )
                    })}
                    {excerpt?.length > 0 && (
                      <li>
                        <Link className="badge" to={fields.slug}>
                          Details
                        </Link>
                      </li>
                    )}
                  </ul>
                  <p>{description}</p>
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
                </div>
              )
            })}
          </div>
        </Terminal>
      </Page>
    </IndexLayout>
  )
}

export default CodeDemosIndex

export const query = graphql`
  query CodeDemosQuery {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }, filter: { frontmatter: { category: { eq: "Code Demos" } } }) {
      nodes {
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
          thumbnail {
            childImageSharp {
              fixed(width: 235) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          technologies
          links {
            title
            url
            color
          }
        }
        excerpt(format: PLAIN)
        fields {
          slug
        }
      }
    }
  }
`
