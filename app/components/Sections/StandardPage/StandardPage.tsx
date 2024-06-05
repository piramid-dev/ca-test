import type { FC } from 'react'

interface StandardPageProps {
  //chips: Array<chips>

  children?: React.ReactNode
}

const StandardPage: FC<StandardPageProps> = ({ children }) => {
  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-dove-500 pt-8 pb-24 lg:pb-36">
      {children}
    </div>
  )
}

export default StandardPage
