import * as React from 'react'

import Page from '../components/Page'
import Container from '../components/Container'
import Terminal from '../components/Terminal'
import IndexLayout from '../layouts'
import ASCII from '../components/ASCII'

const IndexPage = () => {
  return (
    <IndexLayout>
      <Page>
        <Container>
          <Terminal title="/.welcome">
            <h1>Hello, I'm Jo Sprague</h1>
            <p>I'm a Software Engineer and traveler and people call me</p>
            <ASCII text="Local Jo" />
            <br />
            <p>
              I have 10 years of experience working for teams like <a href="">NASA</a> and the{' '}
              <a href="">Humanitarian OpenStreetMap Team</a>.
            </p>
            <p>I like to work with JavaScript/TypeScript, React, Python and related tools and frameworks.</p>
            <p>I'm interested in working with teams that have a mission or product I'm passionate about.</p>
          </Terminal>
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default IndexPage
