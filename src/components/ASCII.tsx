import React, { FC, useState, useEffect } from 'react'
import figlet from 'figlet'
// @ts-ignore
import slant from 'figlet/importable-fonts/Slant.js'
// @ts-ignore
import smallSlant from 'figlet/importable-fonts/Small Slant.js'
import { desaturate } from 'polished'

// @ts-ignore
figlet.parseFont('Small Slant', smallSlant)
// @ts-ignore
figlet.parseFont('Slant', slant)

interface ASCIIProps {
  text?: string
  rainbow?: boolean
  large?: boolean
}

const ASCII: FC<ASCIIProps> = ({ text = 'Hello!', rainbow = true, large = false }) => {
  const [ascii, setAscii] = useState<string>(text)

  useEffect(() => {
    if (text) {
      figlet.text(text, { font: large ? 'Slant' : 'Small Slant' }, (_err, data) => setAscii(data as string))
    }
  })

  if (rainbow) {
    const lines = ascii.split('\n').filter(line => {
      return line.trim().length > 0
    })
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
            <pre key={i} className="rainbow" style={{ color: desaturate(0.2, `rgb(${red},${green},${blue})`) }}>
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
