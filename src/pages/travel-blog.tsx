import * as React from 'react'
import { Link, graphql } from 'gatsby'

import Page from '../components/Page'
import Terminal from '../components/Terminal'
import IndexLayout from '../layouts'
import ASCII from 'react-rainbow-ascii'

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

const TravelBlogIndex: React.FC<BlogIndexProps> = ({ data }) => {
  const meta = {
    pathname: '/travel-blog',
    title: 'Travel Blog',
    description: 'My Personal Travel Stories'
  }
  return (
    <IndexLayout {...meta}>
      <Page>
        <Terminal title="/travel-blog">
          <ASCII text="Travel Blog" fallback="h1" />
          <br />
          <h1>My Personal Travel Stories</h1>
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

export default TravelBlogIndex

export const query = graphql`
  query TravelBlogQuery {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }, filter: { frontmatter: { category: { eq: "Travel" } } }) {
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
