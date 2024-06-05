import type { FC } from 'react'
interface BoxedImageProps {
  imageUrl: string
  imageAltText?: string
}
const BoxedImage: FC<BoxedImageProps> = ({ imageUrl, imageAltText }) => {
  return (
    <div className="container my-4 lg:my-10">
      <img src={imageUrl} alt={imageAltText} className="w-full" />
    </div>
  )
}
export default BoxedImage
