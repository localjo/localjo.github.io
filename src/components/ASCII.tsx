import React, { FC, useState, useEffect } from 'react'
import figlet from 'figlet'
// @ts-ignore
import basicFont from 'figlet/importable-fonts/Basic.js'

// @ts-ignore
figlet.parseFont('Basic', basicFont)

interface ASCIIProps {
  text?: string
  rainbow?: boolean
}

const ASCII: FC<ASCIIProps> = ({ text = 'Hello!', rainbow = true }) => {
  const [ascii, setAscii] = useState<string>(text)

  useEffect(() => {
    if (text) {
      figlet.text(text, { font: 'Basic' }, (_err, data) => setAscii(data as string))
    }
  })

  if (rainbow) {
    const lines = ascii.split('\n')
    const lineColors = lines.map((_line, line) => {
      return Array.from('rbg').map((_c, rbgi) => getPhaseRBG(line, (rbgi * Math.PI * 2) / 3))
    })
    function getPhaseRBG(rbgi: number, phase: number) {
      return Math.floor(Math.sin((Math.PI / lines.length) * 2 * rbgi + phase) * 127) + 128
    }
    return (
      <>
        <style>{`pre.rainbow {margin: 0; padding: 0;}`}</style>
        {lines.map((line, i) => {
          const [red, blue, green] = lineColors[i]
          return (
            <pre key={i} className="rainbow" style={{ color: `rgb(${red},${green},${blue})` }}>
              {line}
            </pre>
          )
        })}
      </>
    )
  } else {
    return <pre>{ascii}</pre>
  }
}

export default ASCII
