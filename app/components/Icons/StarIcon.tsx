import type { FC } from 'react'

interface StarIconProps {}

const StarIcon: FC<StarIconProps> = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0L10.4492 2.08717L13.6569 2.34315L13.9128 5.55083L16 8L13.9128 10.4492L13.6569 13.6569L10.4492 13.9128L8 16L5.55083 13.9128L2.34315 13.6569L2.08717 10.4492L0 8L2.08717 5.55083L2.34315 2.34315L5.55083 2.08717L8 0Z"
        fill="black"
      />
    </svg>
  )
}

export default StarIcon
