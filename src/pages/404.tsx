import * as React from 'react'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import Terminal from '../components/Terminal'
import ASCII from '../components/ASCII'

const NotFoundPage = () => (
  <IndexLayout>
    <Page>
      <Container>
        <Terminal title="/.welcome">
          <ASCII text="404" large={true} />
          <p>command not found</p>
        </Terminal>
      </Container>
    </Page>
  </IndexLayout>
)

export default NotFoundPage
