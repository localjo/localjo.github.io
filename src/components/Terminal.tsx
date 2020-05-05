import React, { FC, useState, useRef, useEffect } from 'react'
import { Link, navigate, graphql, useStaticQuery } from 'gatsby'
import styled from '@emotion/styled'
import { globalHistory as history } from '@reach/router'
import AutosizeInput from 'react-input-autosize'
import { colors, breakpoints, widths } from '../styles/variables'
import { lighten, transparentize, darken } from 'polished'
import { getEmSize } from '../styles/mixins'

const Window = styled.div`
  opacity: 0.9;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: auto;
  max-height: 90vh;
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
  padding: 0 10px 0 76px;
  p {
    font-size: 12px;
    font-weight: 500;
    color: ${darken(0.2, colors.white)};
    padding: 8px 0 8px 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const TrafficLight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  line-height: 12px;
  padding: 0;
  span {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin: 10px 0 0 10px;
    border-radius: 6px;
    appearance: none;
    background-color: ${darken(0.2, colors.white)};
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 8px;
    border: none;
    padding: 0;
    &.green {
      background-color: ${colors.ui.traffic.green};
    }
    &.yellow {
      background-color: ${colors.ui.traffic.yellow};
    }
    &.red {
      background-color: ${colors.ui.traffic.red};
    }
  }
  &:hover {
    span {
      &.green {
        background-image: url(/fullscreen-button.svg);
      }
      &.yellow {
        background-image: url(/minimize-button.svg);
      }
      &.red {
        background-image: url(/close-button.svg);
      }
    }
  }
`

const Main = styled.div`
  padding: 15px 15px 5px 15px;
  font-family: 'Fira Code', Menlo, Monaco, 'Courier New', monospace;
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
    margin-bottom: 16px;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong,
  b {
    font-weight: bold;
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
    margin: 0 0.1em 0.6em 0;
    &.yellow,
    &.javascript,
    &.es6,
    &.babel,
    &.es5 {
      background: ${transparentize(0.2, colors.yellow)};
    }
    &.blue,
    &.wordpress,
    &.typescript,
    &.webpack,
    &.python,
    &.jquery,
    &.mapbox,
    &.lodash,
    &.nasagibsapi,
    &.materialui,
    &.docker,
    &.css {
      background: ${transparentize(0.2, colors.blue)};
    }
    &.teal,
    &.react,
    &.openlayers,
    &.express,
    &.reactrouter,
    &.reacthooks {
      background: ${transparentize(0.2, colors.teal)};
    }
    &.purple,
    &.php,
    &.eslint,
    &.redux,
    &.bootstrap,
    &.preact {
      background: ${transparentize(0.2, lighten(0.25, colors.purple))};
    }
    &.green,
    &.openstreetmapapi {
      background: ${transparentize(0.2, colors.green)};
    }
    &.pink,
    &.seleniumwebdriver,
    &.sass {
      background: ${transparentize(0.2, colors.pink)};
    }
    &.red,
    &.jest {
      background: ${transparentize(0.2, lighten(0.05, colors.red))};
    }
    &.orange,
    &.browserstack,
    &.html {
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
  table {
    font-size: 16px;
    border: none;
    th,
    td {
      vertical-align: top;
      padding: 10px;
      border: none;
    }
  }
  .tile-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .tile {
    background: ${transparentize(0.9, colors.white)};
    padding: 15px;
    margin-bottom: 15px;
    width: 100%;
    min-width: 450px;
    p {
      max-width: 100%;
    }
    @media (min-width: ${getEmSize(breakpoints.lg)}em) {
      max-width: 49%;
    }
    @media (min-width: ${getEmSize(breakpoints.xxl)}em) {
      max-width: 32.5%;
    }
  }
  .project {
    h2 {
      /* Title */
      margin: 0 0 1em 0;
    }
    p:nth-of-type(2) {
      /* Description */
      clear: both;
    }
    p:nth-of-type(1) {
      /* Image */
      float: left;
      width: 245px;
      max-height: 160px;
      overflow: hidden;
    }
    h3:nth-of-type(1) {
      /* Link Title */
      padding-left: 15px;
      overflow: hidden;
    }
    ul:nth-of-type(1) {
      /* Links */
      padding-left: 15px;
      li:before {
        content: '';
        padding: 0;
      }
    }
    h3:nth-of-type(2) {
      /* Tech Title */
      display: none;
    }
    ul:nth-of-type(2) {
      /* Badges */
      clear: both;
      li {
        display: inline-block;
      }
      li:before {
        content: '';
        padding: 0;
      }
    }
  }
  .experience {
    h3 {
      padding: 10px;
      background: ${transparentize(0.9, colors.white)};
    }
    a {
      color: ${colors.blue};
    }
    p > em,
    p > i {
      color: ${transparentize(0.5, colors.white)};
      a {
        color: ${colors.ui.terminal};
        background: ${colors.blue};
        font-style: normal;
        padding: 0 0.3em;
      }
    }
    p {
      padding: 0 0 0 10px;
    }
    ul {
      li {
        margin-bottom: 1em;
        &:before {
          position: absolute;
          right: 100%;
        }
      }
      position: relative;
      margin: 0 auto;
      max-width: 80%;
    }
    pre {
      margin-bottom: 2em;
    }
    @media (min-width: ${getEmSize(breakpoints.sm)}em) {
      pre {
        float: left;
        margin: 0 2em 2em 0;
      }
    }
  }
`

const Content = styled.div`
  overflow: scroll;
  overflow-x: hidden;
`

const Footer = styled.div`
  background: ${colors.ui.terminal};
  padding: 10px 0;
  position: sticky;
  bottom: -1px; // Footer must overlap container by 1px to trigger stuck attribute used below
  &[stuck] {
    padding: 10px 0 9px 0;
    &:before {
      position: absolute;
      bottom: 100%;
      height: 60px;
      width: 100%;
      content: '';
      background: linear-gradient(to top, ${colors.ui.terminal} 50%, ${transparentize(1, colors.ui.terminal)} 100%);
      pointer-events: none;
    }
    &:after {
      position: absolute;
      bottom: 100%;
      width: 100%;
      content: '-- scroll down --';
      text-align: left;
      color: ${colors.ui.terminal};
      background: ${darken(0.5, colors.white)};
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
  .tip {
    display: none;
  }
  @media (max-width: ${getEmSize(breakpoints.sm)}em) {
    ul.ls li {
      display: block;
    }
    .tip {
      display: inline;
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

interface TerminalProps {
  title?: string
  commands?: {
    [key: string]: {
      aliases?: string[]
      action: Function
    }
  }
  closedNav?: boolean
  isMax?: boolean
}

interface MenuLink {
  name: string
  link: string
}

const Terminal: FC<TerminalProps> = ({ children, title, closedNav = false, isMax = false }) => {
  const { location } = history
  const [value, setValue] = useState<string>()
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [navOpen, setNavOpen] = useState<boolean>(true)
  const [maxWidth, setMaxWidth] = useState<number | string>(isMax ? 'none' : widths.lg)
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
    const handleSetNavState = () => {
      if (footerRef.current && footerRef.current.offsetWidth < breakpoints.sm) {
        setNavOpen(false)
      } else {
        setNavOpen(true)
      }
    }
    let observer: IntersectionObserver
    if (footerRef.current) {
      observer = new IntersectionObserver(
        ([e]) => {
          e.target.toggleAttribute('stuck', e.intersectionRatio < 1)
        },
        { threshold: [1] }
      )
      observer.observe(footerRef.current)
      if (!closedNav) handleSetNavState()
    }
    setIsMounted(true)
    return () => {
      observer.disconnect()
    }
  }, [footerRef])

  let menuLinks = data.allMarkdownRemark.edges.map((edge: any) => {
    return {
      name: edge.node.frontmatter.title,
      link: edge.node.fields.slug
    }
  })
  menuLinks.push(
    {
      name: 'Travel Blog',
      link: '/travel-blog'
    },
    {
      name: 'Open Source',
      link: '/open-source'
    },
    {
      name: 'Sample Code',
      link: '/code-demos'
    }
  )
  menuLinks.sort((linkA: MenuLink, linkB: MenuLink) => {
    var a = linkA.name.toLowerCase()
    var b = linkB.name.toLowerCase()
    return a < b ? -1 : a > b ? 1 : 0
  })

  menuLinks.unshift({
    name: 'Home',
    link: '/'
  })
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
    if ((isPrompt || isPromptChild) && promptRef.current) {
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
          const next = commandNames.filter(command => command && command.toLowerCase().startsWith(value.toLowerCase()))[0]
          next && setValue(next.toLowerCase())
          break
        default:
      }
    }
  }
  const titleBarLocation = title || location.pathname
  const titleBarText = isMounted ? `you@localjo-portfolio: ~${titleBarLocation}` : ''
  return (
    <Window onClick={handleWindowClick} style={{ maxWidth }}>
      <TitleBar aria-hidden="true">
        <TrafficLight>
          <span className="red" onClick={() => navigate('/')}></span>
          <span className="yellow" onClick={() => navigate('/ascii')}></span>
          <span className="green" onClick={() => (maxWidth === 'none' ? setMaxWidth(widths.lg) : setMaxWidth('none'))}></span>
        </TrafficLight>
        <p title={titleBarText}>{titleBarText}</p>
      </TitleBar>
      <Main className="terminal-main">
        <Content>{children}</Content>
        <Footer ref={footerRef}>
          <p aria-label="Toggle navigation" onClick={() => setNavOpen(!navOpen)}>
            > nav {!navOpen ? <small># tap to open menu</small> : isMounted && <small className="tip"># tap to close menu</small>}
          </p>
          {navOpen ? (
            <>
              <ul className="ls">
                {menuLinks.map((item: MenuLink) => (
                  <li key={item.link}>
                    <Link className={`${item.link === location.pathname ? 'badge' : ''}`} to={item.link}>
                      /{item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              {isMounted && (
                <div className="prompt">
                  <span aria-hidden="true">>&nbsp;</span>
                  <AutosizeInput
                    ref={promptRef as any}
                    aria-label="Navigate to page"
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
              )}
            </>
          ) : null}
        </Footer>
      </Main>
    </Window>
  )
}

export default Terminal
