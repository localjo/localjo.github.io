import * as React from 'react'
import { Link } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import Terminal from '../components/Terminal'
import IndexLayout from '../layouts'
import ASCII from '../components/ASCII'

const commands = {
  clear: {
    action: () => console.log('clear')
  }
}

const IndexPage = () => (
  <IndexLayout>
    <Page>
      <Container>
        <Terminal title="/.welcome" commands={commands}>
          <h1>Hello, I'm Jo Sprague</h1>
          <p>I'm a Software Engineer and traveler and people call me</p>
          <ASCII text="Local Jo" />
          <br />
          <p>
            I have 10 years of experience working for teams like <a href="">NASA</a> and the <a href="">Humanitarian OpenStreetMap Team</a>.
          </p>
          <p>I like to work with JavaScript/TypeScript, React, Python and related tools and frameworks.</p>
          <p>I'm interested in working with teams that have a mission or product I'm passionate about.</p>
          <p>
            > <code>ls</code> <small># tap one of the options below</small>
          </p>
          <ul className="ls">
            <li>
              <Link to="/page-2/">/Code Samples</Link>
            </li>
            <li>
              <Link to="/page-2/">/Experience</Link>
            </li>
            <li>
              <Link to="/page-2/">/Technologies</Link>
            </li>
            <li>
              <Link to="/page-2/">/Blog</Link>
            </li>
            <li>
              <Link to="/page-2/">/Links</Link>
            </li>
            <li>
              <Link to="/page-2/">/Sponsor Me</Link>
            </li>
            <li>
              <Link to="/page-2/">/Hire Me</Link>
            </li>
          </ul>
        </Terminal>
      </Container>
    </Page>
  </IndexLayout>
)

export default IndexPage
