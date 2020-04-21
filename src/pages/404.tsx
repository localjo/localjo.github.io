import * as React from 'react'

import Page from '../components/Page'
import IndexLayout from '../layouts'
import Terminal from '../components/Terminal'
import ASCII from '../components/ASCII'

const NotFoundPage = () => (
  <IndexLayout>
    <Page>
      <Terminal title="/.welcome">
        <ASCII text="404" large={true} />
        <br />
        <p>command not found</p>
        <p>try one of these pages:</p>
      </Terminal>
    </Page>
  </IndexLayout>
)

export default NotFoundPage
