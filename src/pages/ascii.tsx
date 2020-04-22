import React, { useState, useRef } from 'react'

import Page from '../components/Page'
import Terminal from '../components/Terminal'
import IndexLayout from '../layouts'
import ASCII from '../components/ASCII'
import styled from '@emotion/styled'
import { darken } from 'polished'
import { colors } from '../styles/variables'

const Prompt = styled.div`
  .prompt {
    min-height: 2em;
    input {
      font-size: 16px;
      text-align: left;
      box-sizing: content-box;
      appearance: none;
      background: transparent;
      border: none;
      color: ${darken(0.2, colors.white)};
      &:focus {
        overflow: hidden;
        white-space: nowrap;
        display: inline-block;
        outline: none;
        border-bottom: 1px dotted ${darken(0.5, colors.white)};
      }
    }
  }
`

const IndexPage = () => {
  const [value, setValue] = useState<string>('ASCII Generator')
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <IndexLayout>
      <Page>
        <Terminal title="/.ascii-demo" closedNav={true}>
          <div onClick={()=> inputRef.current?.focus()}>
          <ASCII text={value} large={true} />
          </div>
          <br />
          <Prompt>
          <div className="prompt">
            Type here:&nbsp;
            <input
              ref={inputRef}
              aria-label="Change ASCII text"
              autoFocus
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            />
          </div>
          </Prompt>
        </Terminal>
      </Page>
    </IndexLayout>
  )
}

export default IndexPage
