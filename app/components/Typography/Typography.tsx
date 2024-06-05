import type { FC } from 'react'
import React from 'react'

interface TypographyProps {}

/**
 * Primary UI component for user interaction
 */
const Typography: FC<TypographyProps> = ({ ...props }) => {
  const base_rem = 16
  const min_font = 12
  const max_font = 14
  const min_width = 1024
  const max_width = 1440
  const v = (100 * (max_font - min_font)) / (max_width - min_width)
  const r =
    (min_width * max_font - max_width * min_font) / (min_width - max_width)
  console.log(
    min_font / base_rem +
      'rem, ' +
      v +
      'vw + ' +
      r / base_rem +
      'rem, ' +
      max_font / base_rem +
      'rem',
  )
  console.log('caclculated max mobile: ' + (min_font / 375) * 768)
  console.log('caclculated min desktop: ' + (max_font / 1440) * 1024)

  return (
    <>
      <h2 className="h1 font-sans">Lorem ipsum</h2>
      <h2 className="h2 font-sans">Lorem ipsum</h2>
      <h2 className="h3 font-sans">Lorem ipsum</h2>
      <h2 className="h4 font-sans">Lorem ipsum</h2>
      <h2 className="h5 font-sans">Lorem ipsum</h2>
      <p className="display-l font-sans">Lorem ipsum dolor sit amet</p>
      <p className="display-m font-sans">Lorem ipsum dolor sit amet</p>
      <p className="display-s font-sans">Lorem ipsum dolor sit amet</p>
      <p className="body-xl font-sans">Lorem ipsum dolor sit amet</p>
      <p className="body-l font-sans">Lorem ipsum dolor sit amet</p>
      <p className="body-m font-sans">Lorem ipsum dolor sit amet</p>
      <p className="body-s font-sans">Lorem ipsum dolor sit amet</p>
      <p className="body-xs font-sans">Lorem ipsum dolor sit amet</p>

      <h2 className="h1 font-serif">Lorem ipsum</h2>
      <h2 className="h2 font-serif">Lorem ipsum</h2>
      <h2 className="h3 font-serif">Lorem ipsum</h2>
      <h2 className="h4 font-serif">Lorem ipsum</h2>
      <h2 className="h5 font-serif">Lorem ipsum</h2>
      <p className="display-l font-serif">Lorem ipsum dolor sit amet</p>
      <p className="display-m font-serif">Lorem ipsum dolor sit amet</p>
      <p className="display-s font-serif">Lorem ipsum dolor sit amet</p>
      <p className="body-xl font-serif">Lorem ipsum dolor sit amet</p>
      <p className="body-l font-serif">Lorem ipsum dolor sit amet</p>
      <p className="body-m font-serif">Lorem ipsum dolor sit amet</p>
      <p className="body-s font-serif">Lorem ipsum dolor sit amet</p>
      <p className="body-xs font-serif">Lorem ipsum dolor sit amet</p>

      <p className="body-m font-condensed">Lorem ipsum dolor sit amet</p>
      <p className="body-s font-condensed">Lorem ipsum dolor sit amet</p>

      <p className="body-s font-mono">Lorem ipsum dolor sit amet</p>
    </>
  )
}

export default Typography
