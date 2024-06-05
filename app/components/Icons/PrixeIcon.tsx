import classNames from 'classnames'
import type { FC } from 'react'

interface PrizeIconProps {
  color: 'silver' | 'yellow' | 'green' | 'blue'
}

const PrizeIcon: FC<PrizeIconProps> = ({ color }) => {
  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames({
        'mr-0.5': true,
        'fill-silver-500': color === 'silver',
        'fill-yellow-500': color === 'yellow',
        'fill-green-300': color === 'green',
        'fill-blue-300': color === 'blue',
      })}
    >
      <path d="M18.3988 6.61699L17.2928 7.71722L14.7733 3.37698L16.2842 2.97418L15.6982 0.798856L14.3116 0.00260463L12.1245 0.585583L12.5284 2.08478H7.49442L7.8991 0.582825L5.71193 0L4.32535 0.796251L3.7392 2.97158L5.22653 3.36794L2.69845 7.72289L1.60117 6.63139L0 8.2239V9.81625L1.60117 11.4087L2.69845 10.3173L5.20357 14.6328L3.71933 15.0284L4.30532 17.2037L5.69191 18L7.87907 17.417L7.48533 15.9554H12.5288L12.1368 17.4103L14.324 17.9933L15.7105 17.197L16.2967 15.0217L14.7972 14.6221L17.3032 10.3048L18.3988 11.3945L20 9.802V8.20949L18.3988 6.61699Z" />
    </svg>
  )
}

export default PrizeIcon
