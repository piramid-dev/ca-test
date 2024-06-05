import type { FC, ReactNode } from 'react'
interface UserProfileBlockProps {
  title: string
  children: ReactNode
}
const UserProfileBlock: FC<UserProfileBlockProps> = ({ title, children }) => {
  return (
    <div className="container">
      <div className="h3 font-sans !font-bold mb-6">{title}</div>
      {children}
    </div>
  )
}
export default UserProfileBlock
