import React, { useState, useRef } from 'react'

import Page from '../components/Page'
import Terminal from '../components/Terminal'
import IndexLayout from '../layouts'
import ASCII from '../components/ASCII'
import styled from '@emotion/styled'
import { darken } from 'polished'
import { colors } from '../styles/variables'
import AutosizeInput from 'react-input-autosize'

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
      border-right: 0.8em solid;
      margin-right: 0.2em;
      /* Text color with hidden caret */
      text-shadow: 0 0 0 ${darken(0.2, colors.white)};
      color: transparent;
      &:focus {
        overflow: hidden;
        white-space: nowrap;
        padding-right: 0;
        display: inline-block;
        outline: none;
        animation: blink-caret 1.2s step-end infinite;
      }
    }
  }

  @keyframes blink-caret {
    from,
    to {
      border-right-color: transparent;
    }
    50% {
      border-right-color: ${darken(0.2, colors.white)};
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
            <AutosizeInput
              ref={inputRef as any}
              aria-label="Change ASCII text"
              autoFocus
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
              onSelect={(e: React.ChangeEvent<HTMLInputElement>) => e.target.selectionStart = e.target.value.length}
            />
          </div>
          </Prompt>
        </Terminal>
      </Page>
    </IndexLayout>
  )
}

export default IndexPage
