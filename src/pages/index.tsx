import * as React from 'react'
import { Link } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import Terminal from '../components/Terminal'
import IndexLayout from '../layouts'
import ASCII from '../components/ASCII'

const IndexPage = () => (
  <IndexLayout>
    <Page>
      <Container>
        <Terminal title="/.welcome">
          <h1>Welcome to my site!</h1>
          <br />
          <ASCII text="Local Jo" />
          <br />
          <Link to="/page-2/">Go to page 2</Link>
        </Terminal>
      </Container>
    </Page>
  </IndexLayout>
)

export default IndexPage
