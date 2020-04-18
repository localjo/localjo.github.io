import React, { FC } from 'react'

const ASCII: FC = () => {
  const text = `
db       .d88b.   .o88b.  .d8b.  db             d88b  .d88b.
88      .8P  Y8. d8P  Y8 d8' '8b 88             '8P' .8P  Y8.
88      88    88 8P      88ooo88 88              88  88    88
88      88    88 8b      88   88 88              88  88    88
88booo. '8b  d8' Y8b  d8 88   88 88booo.     db. 88  '8b  d8'
Y88888P  'Y88P'   'Y88P' YP   YP Y88888P     Y8888P   'Y88P'
`
  const lines = text.split('\n')
  const lineColors = lines.map((_line, line) => {
    return Array.from('rbg').map((_c, rbgi) => getPhaseRBG(line, (rbgi * Math.PI * 2) / 3))
  })
  function getPhaseRBG(rbgi: number, phase: number) {
    return Math.floor(Math.sin((Math.PI / lines.length) * 2 * rbgi + phase) * 127) + 128
  }
  return (
    <>
      {lines.map((line, i) => {
        const [red, blue, green] = lineColors[i]
        return (
          <pre key={i} style={{ color: `rgb(${red},${green},${blue})` }}>
            {line}
          </pre>
        )
      })}
    </>
  )
}

export default ASCII
