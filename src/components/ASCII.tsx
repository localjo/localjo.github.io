import React, { FC, useState, useLayoutEffect, useRef } from 'react'
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
  const [width, setWidth] = useState<number>(0)
  const [baseFontSize, setBaseFontSize] = useState<number>(16)
  const preWrap = useRef<HTMLDivElement>(null)
  const widthTest = useRef<HTMLPreElement>(null)
  const lines = ascii.split('\n').filter(line => {
    return line.trim().length > 0
  }) || [' ']
  const measuredWidth = widthTest.current ? widthTest.current.offsetWidth : 100
  const lineLength = lines[0] ? lines[0].length : 1
  const measuredFontSize = 100
  const targetFontSize = (measuredFontSize * (width / lineLength)) / measuredWidth
  const fontSize = targetFontSize < baseFontSize ? targetFontSize : baseFontSize

  useLayoutEffect(() => {
    figlet.text(text, { font: large ? 'Slant' : 'Small Slant' }, (_err, data) => setAscii(data as string))
    const getParentWidth = () => {
      if (preWrap.current) {
        setWidth(preWrap.current.offsetWidth)
        setBaseFontSize(parseFloat(window.getComputedStyle(preWrap.current).getPropertyValue('font-size')))
      }
    }
    if (preWrap.current) getParentWidth()
    window.addEventListener('resize', getParentWidth)
    return () => window.removeEventListener('resize', getParentWidth)
  }, [preWrap.current, text])

  if (rainbow) {
    const lineColors = lines.map((_line, line) => {
      return Array.from('rbg').map((_c, rbgi) => getPhaseRBG(line, (rbgi * Math.PI * 2) / 3))
    })
    function getPhaseRBG(rbgi: number, phase: number) {
      return Math.floor(Math.sin((Math.PI / lines.length) * 2 * rbgi + phase) * 127) + 128
    }
    return (
      <div ref={preWrap}>
        <style>{`pre.rainbow {margin: 0; padding: 0; font-size: ${fontSize}px;}`}</style>
        {lines.map((line, i) => {
          const [red, blue, green] = lineColors[i]
          return (
            <pre key={i} className="rainbow" style={{ color: desaturate(0.2, `rgb(${red},${green},${blue})`) }}>
              {line}
            </pre>
          )
        })}
        <pre
          ref={widthTest}
          style={{
            fontSize: `${measuredFontSize}px`,
            position: 'absolute',
            visibility: 'hidden'
          }}
        >
          &nbsp;
        </pre>
      </div>
    )
  } else {
    return <pre>{ascii}</pre>
  }
}

export default ASCII
