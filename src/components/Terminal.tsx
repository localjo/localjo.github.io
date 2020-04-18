import React, { FC } from 'react'
import styled from '@emotion/styled'
import { globalHistory as history } from '@reach/router'

import { widths } from '../styles/variables'
import { getEmSize } from '../styles/mixins'

const Window = styled.div`
  opacity: 0.9;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: auto;
  max-width: ${getEmSize(widths.lg)}em;
  background: rgb(40, 44, 51);
  color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 1px, rgba(0, 0, 0, 0.1) -1px -1px, rgba(0, 0, 0, 0.1) 1px -1px, rgba(0, 0, 0, 0.1) -1px 1px,
    rgba(0, 0, 0, 0.8) 0 0 70px;
  border-radius: 5px;
  overflow: scroll;
`
const TitleBar = styled.div`
  text-align: center;
  h1 {
    font-size: 12px;
    color: rgb(203, 203, 203);
    padding: 8px 0 8px 0;
    margin: 0;
  }
`

const TrafficLight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  line-height: 12px;
  padding: 0;
  button {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin: 10px 0 0 10px;
    border-radius: 6px;
    appearance: none;
    background: white;
    border: none;
    padding: 0;
    &.green {
      background: rgb(99, 199, 86);
    }
    &.yellow {
      background: rgb(246, 193, 81);
    }
    &.red {
      background: rgb(236, 97, 86);
    }
  }
`

const Main = styled.div`
  padding: 15px;
  font-family: monospace;
  font-size: 16px;
  line-height: 1.2em;
  min-height: 600px;
  color: rgb(199, 199, 199);
  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    font-size: inherit;
    color: inherit;
  }
  code,
  pre {
    color: rgb(254, 125, 232);
    margin: 0;
    padding: 0;
  }
  a {
    color: rgb(199, 199, 199);
    text-decoration: underline;
    &:hover {
      background: rgb(199, 199, 199);
      color: rgb(40, 44, 51);
    }
  }
`

interface TerminalProps {
  title?: string
}

const Terminal: FC<TerminalProps> = ({ children, title }) => {
  const { location } = history
  return (
    <Window>
      <TitleBar>
        <TrafficLight>
          <button className="red"></button>
          <button className="yellow"></button>
          <button className="green"></button>
        </TrafficLight>
        <h1>you@localjo-portfolio: ~{title || location.pathname}</h1>
      </TitleBar>
      <Main>{children}</Main>
    </Window>
  )
}

export default Terminal
