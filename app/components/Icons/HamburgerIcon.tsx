import type { FC } from 'react'

interface Hamburger {
  color: 'black' | 'white'
}

const HamburgerIcon: FC<Hamburger> = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M27.75 16C27.75 16.1989 27.671 16.3897 27.5303 16.5303C27.3897 16.6717.1989 16.75 27 16.75H5C4.80109 16.75 4.61032 16.671 4.46967 16.5303C4.32902 16.3897 4.25 16.1989 4.25 16C4.25 15.8011 4.32902 15.6103 4.46967 15.4697C4.61032 15.329 4.80109 15.25 5 15.25H27C27.1989 15.25 27.3897 15.329 27.5303 15.4697C27.671 15.6103 27.75 15.8011 27.75 16ZM5 8.75H27C27.1989 8.75 27.3897 8.67098 27.5303 8.53033C27.671 8.38968 27.75 8.19891 27.75 8C27.75 7.80109 27.671 7.61032 27.5303 7.46967C27.3897 7.32902 27.1989 7.25 27 7.25H5C4.80109 7.25 4.61032 7.32902 4.46967 7.46967C4.32902 7.61032 4.25 7.80109 4.25 8C4.25 8.19891 4.32902 8.38968 4.46967 8.53033C4.61032 8.67098 4.80109 8.75 5 8.75ZM27 23.25H5C4.80109 23.25 4.61032 23.329 4.46967 23.4697C4.32902 23.6103 4.25 23.8011 4.25 24C4.25 24.1989 4.32902 24.3897 4.46967 24.5303C4.61032 24.671 4.80109 24.75 5 24.75H27C27.1989 24.75 27.3897 24.671 27.5303 24.5303C27.671 24.3897 27.75 24.1989 27.75 24C27.75 23.8011 27.671 23.6103 27.5303 23.4697C27.3897 23.329 27.1989 23.25 27 23.25Z"
      />
    </svg>
  )
}

export default HamburgerIcon
