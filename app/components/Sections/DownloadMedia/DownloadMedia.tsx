import type { FC } from 'react'
import type { ResponsiveImageType } from 'react-datocms'
import { Image } from 'react-datocms'
import type { Maybe } from '../../../lib/generated'

import SectionWrapper from '../../Atoms/SectionWrapper'
import DownloadItem from '../../Organisms/DownloadItem'
import type { DownloadItemProps } from '../../Organisms/DownloadItem/DownloadItem'

interface DownloadMediaProps {
  title: string
  image: Maybe<ResponsiveImageType> | undefined
  items: DownloadItemProps[]
}
const DownloadMedia: FC<DownloadMediaProps> = ({ title, image, items }) => (
  <SectionWrapper
    background="dove"
    rounded={false}
    containerClass="lg:flex lg:justify-between"
  >
    <div className="lg:w-/1/2 lg:basis-6/12 flex flex-col">
      <div className="lg:w-1/2">
        <h2 className="h2 font-sans">{title}</h2>
      </div>
      <div className="mt-152 lg:mt-auto w-full">
        {items?.map((el, i) => <DownloadItem key={i} {...el} />)}
      </div>
    </div>
    <div className="lg:w-5/12 max-lg:mt-12 lg:mb-10">
      {image ? <Image data={image} /> : null}
    </div>
  </SectionWrapper>
)

export default DownloadMedia
