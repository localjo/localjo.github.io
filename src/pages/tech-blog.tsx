import * as React from 'react'
import { Link, graphql } from 'gatsby'

import Page from '../components/Page'
import Terminal from '../components/Terminal'
import IndexLayout from '../layouts'
import ASCII from '../components/ASCII'

interface BlogIndexProps {
  data: {
    allMarkdownRemark: {
      nodes: [
        {
          excerpt: string
          fields: {
            slug: string
          }
          frontmatter: {
            title: string
            date: string
          }
        }
      ]
    }
  }
}

const TechBlogIndex: React.FC<BlogIndexProps> = ({ data }) => {
  return (
    <IndexLayout>
      <Page>
        <Terminal title="/tech-blog">
          <ASCII text="Tech Blog" large={true} />
          <br />
          <h1>My Technical Blog Posts</h1>
          <ul>
            {data.allMarkdownRemark.nodes.map(post => {
              return (
                <li key={post.fields.slug}>
                  <Link to={post.fields.slug}>{post.frontmatter.title}</Link> - posted on {post.frontmatter.date}
                  <br />
                  <small style={{ paddingLeft: '1em', display: 'block' }}>{post.excerpt}</small>
                </li>
              )
            })}
          </ul>
        </Terminal>
      </Page>
    </IndexLayout>
  )
}

export default TechBlogIndex

export const query = graphql`
  query TechBlogQuery {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }, filter: { frontmatter: { category: { eq: "Tech" } } }) {
      nodes {
        excerpt(format: PLAIN)
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM Do, YYYY")
        }
      }
    }
  }
`
