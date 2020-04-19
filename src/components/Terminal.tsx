import React, { FC, useState, useRef, useEffect } from 'react'
import { Link, navigate, graphql, useStaticQuery } from 'gatsby'
import styled from '@emotion/styled'
import { globalHistory as history } from '@reach/router'
import AutosizeInput from 'react-input-autosize'
import { colors, breakpoints } from '../styles/variables'
import { lighten, transparentize, darken } from 'polished'
import { getEmSize } from '../styles/mixins'

const Window = styled.div`
  opacity: 0.9;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: auto;
  max-height: 95vh;
  overflow: scroll;
  background: ${colors.ui.terminal};
  color: ${colors.white};
  box-shadow: rgba(0, 0, 0, 0.1) 1px 1px, rgba(0, 0, 0, 0.1) -1px -1px, rgba(0, 0, 0, 0.1) 1px -1px, rgba(0, 0, 0, 0.1) -1px 1px,
    rgba(0, 0, 0, 0.8) 0 0 70px;
  border-radius: 5px;
`
const TitleBar = styled.div`
  background: ${colors.ui.terminal};
  position: sticky;
  top: 0;
  z-index: 100;
  text-align: center;
  span {
    font-size: 12px;
    font-weight: 500;
    color: ${darken(0.2, colors.white)};
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
    background: ${darken(0.2, colors.white)};
    border: none;
    padding: 0;
    &.green {
      background: ${colors.ui.traffic.green};
    }
    &.yellow {
      background: ${colors.ui.traffic.yellow};
    }
    &.red {
      background: ${colors.ui.traffic.red};
    }
  }
`

const Main = styled.div`
  padding: 15px 15px 5px 15px;
  font-family: monospace;
  font-size: 16px;
  line-height: 1.5em;
  min-height: 600px;
  color: ${darken(0.2, colors.white)};
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  small,
  strong,
  b,
  em,
  p {
    font-size: inherit;
    color: inherit;
  }
  hr {
    border-style: dashed;
  }
  small {
    opacity: 0.5;
  }
  .badge {
    white-space: nowrap;
    background: ${darken(0.2, colors.white)};
    color: ${colors.ui.terminal};
    font-style: normal;
    text-decoration: none;
    display: inline-block;
    padding: 0 0.4em;
    margin: 0 0 0.6em 0;
    &.yellow {
      background: ${transparentize(0.2, colors.yellow)};
    }
    &.blue {
      background: ${transparentize(0.2, colors.blue)};
    }
    &.teal {
      background: ${transparentize(0.2, colors.teal)};
    }
    &.purple {
      background: ${transparentize(0.2, lighten(0.25, colors.purple))};
    }
    &.green {
      background: ${transparentize(0.2, colors.green)};
    }
    &.pink {
      background: ${transparentize(0.2, colors.pink)};
    }
    &.red {
      background: ${transparentize(0.2, lighten(0.05, colors.red))};
    }
    &.orange {
      background: ${transparentize(0.2, lighten(0.05, colors.orange))};
    }
  }
  .emoji {
    text-indent: -2em;
    margin-left: 2em;
  }
  .columns {
    @media (min-width: ${getEmSize(breakpoints.md)}em) {
      columns: 2;
    }
  }
  ul,
  .section {
    margin: 0;
    -webkit-column-break-inside: avoid; /* Chrome, Safari */
    page-break-inside: avoid; /* Theoretically FF 20+ */
    break-inside: avoid-column; /* IE 11 */
    display: table; /* Actually FF 20+ */
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      margin: 0;
      padding: 0;
    }
    li:before {
      content: '»';
      padding-right: 0.5em;
    }
  }
  code,
  pre {
    color: ${colors.code};
    margin: 0;
    padding: 0;
    line-height: 1.1em;
  }
  a {
    color: ${darken(0.2, colors.white)};
    text-decoration: underline;
    &:hover {
      background: ${darken(0.2, colors.white)};
      color: ${colors.ui.terminal};
    }
  }
`

const Content = styled.div`
  overflow: scroll;
`

const Footer = styled.div`
  background: ${colors.ui.terminal};
  padding: 10px 0;
  position: sticky;
  bottom: -1px; // Footer must overlap container by 1px to trigger stuck attribute used below
  &[stuck] {
    padding: 10px 0 9px 0;
    &:after {
      position: absolute;
      bottom: 100%;
      height: 50px;
      width: 100%;
      content: '';
      background: linear-gradient(to top, ${colors.ui.terminal} 0%, ${transparentize(1, colors.ui.terminal)} 90%);
      pointer-events: none;
    }
    &:before {
      position: absolute;
      top: -5px;
      width: 100%;
      content: '˅˅ scroll ˅˅';
      text-align: center;
      color: ${transparentize(0.7, colors.white)};
      pointer-events: none;
    }
  }
  ul.ls {
    list-style: none;
    margin-left: 0;
    padding-left: 0;
    li {
      display: inline-block;
      margin-right: 2em;
      margin-bottom: 1em;
      margin-left: 0;
      padding-left: 0;
      &:before {
        content: '';
      }
    }
  }
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

interface TerminalProps {
  title?: string
  commands?: {
    [key: string]: {
      aliases?: string[]
      action: Function
    }
  }
}

interface MenuLink {
  name: string
  link: string
}

const Terminal: FC<TerminalProps> = ({ children, title }) => {
  const { location } = history
  const [value, setValue] = useState<string>()
  const promptRef = useRef<HTMLInputElement>(null)
  const footerRef = useRef<HTMLInputElement>(null)
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { frontmatter: { layout: { eq: "page" } } }, sort: { order: ASC, fields: frontmatter___title }) {
        edges {
          node {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  useEffect(() => {
    let observer: IntersectionObserver
    if (footerRef.current) {
      observer = new IntersectionObserver(
        ([e]) => {
          e.target.toggleAttribute('stuck', e.intersectionRatio < 1)
        },
        { threshold: [1] }
      )

      observer.observe(footerRef.current)
    }
    return () => {
      observer.disconnect()
    }
  }, [footerRef])

  const menuLinks = data.allMarkdownRemark.edges
    .map((edge: any) => {
      return {
        name: edge.node.frontmatter.title,
        link: edge.node.fields.slug
      }
    })
    .filter((item: MenuLink) => item.link !== location.pathname)
  if (location.pathname !== '/') {
    menuLinks.push({
      name: 'Home',
      link: '/'
    })
  }
  const commands = menuLinks.reduce((obj: { [key: string]: { aliases?: string[]; action?: Function } }, item: MenuLink) => {
    obj[item.name] = {
      action: () => {
        navigate(item.link)
      }
    }
    return obj
  }, {})
  const commandNames = Object.keys(commands)

  const moveCursorToEnd = (e: any) => {
    const { value } = e.target
    e.target.selectionStart = value.length
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setValue(value.toLowerCase().slice(0, 50))
    e.target.selectionStart = value.length
  }
  const handleWindowClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const isPromptChild = (e.target as HTMLInputElement).closest('.prompt')
    const isPrompt = (e.target as HTMLInputElement).classList.contains('prompt')
    const isTerminalMain = (e.target as HTMLInputElement).classList.contains('terminal-main')
    if ((isPrompt || isPromptChild || isTerminalMain) && promptRef.current) {
      promptRef.current.focus()
    }
  }
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (value && value.length > 0) {
      switch (e.keyCode) {
        case 13:
          const selected = commandNames.filter(command => command.toLowerCase().startsWith(value.toLowerCase()))[0]
          const command = commands[selected]
          const { action } = command ? command : { action: () => {} }
          if (typeof action === 'function') {
            action()
          }
          setValue('')
          break
        case 9:
          e.preventDefault() // Prevents breaking focus
          const next = commandNames.filter(command => command.toLowerCase().startsWith(value.toLowerCase()))[0]
          setValue(next.toLowerCase())
          break
        default:
      }
    }
  }
  return (
    <Window onClick={handleWindowClick}>
      <TitleBar>
        <TrafficLight>
          <button className="red" onClick={() => navigate('/')}></button>
          <button className="yellow"></button>
          <button className="green"></button>
        </TrafficLight>
        <span>you@localjo-portfolio: ~{title || location.pathname}</span>
      </TitleBar>
      <Main className="terminal-main">
        <Content>{children}</Content>
        <Footer ref={footerRef}>
          <p>
            > ls <small># tap one of the options below</small>
          </p>
          <ul className="ls">
            {menuLinks.map((item: MenuLink) => (
              <li key={item.link}>
                <Link to={item.link}>/{item.name}</Link>
              </li>
            ))}
          </ul>
          <div className="prompt">
            >&nbsp;
            <AutosizeInput
              ref={promptRef as any}
              autoFocus
              value={value}
              onChange={handleChange}
              onSelect={moveCursorToEnd}
              onKeyDown={handleKeyDown}
            />
            {commandNames
              .filter(command => {
                if (value && value.length > 0) {
                  return command.toLowerCase().startsWith(value.toLowerCase())
                } else {
                  return false
                }
              })
              .map((command, i, arr) => {
                const isLast = i === arr.length - 1
                const isFirst = i === 0
                return (
                  <small key={command} style={isFirst ? { opacity: 0.7, position: 'relative', left: '-1em' } : {}}>
                    {isFirst && value ? command.toLowerCase().replace(value, '') : command.toLowerCase()}
                    {isLast ? '' : ', '}
                  </small>
                )
              })}
          </div>
        </Footer>
      </Main>
    </Window>
  )
}

export default Terminal
