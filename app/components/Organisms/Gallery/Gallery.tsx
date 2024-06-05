import classNames from 'classnames'
import { useRef, useState, type FC } from 'react'
import { Image } from 'react-datocms'
import type { ResponsiveImageType } from 'react-datocms/image'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Maybe } from '~/lib/generated'

import SectionWrapper from '../../Atoms/SectionWrapper'
import CarouselNavigation from '../../Molecules/CarouselNavigation'

import 'swiper/swiper-bundle.min.css'

interface GalleryProps {
  title?: Maybe<string>
  images: (Maybe<ResponsiveImageType> | undefined)[]
  backgroundColor?: 'dove' | 'white' | 'black' | 'transparent' | string
  overlap?: boolean
}

const Gallery: FC<GalleryProps> = ({
  title = 'Gallery',
  images,
  backgroundColor = 'dove',
  overlap = true,
}) => {
  const sliderRef = useRef<any>(null)
  const [swiperReady, setSwiperReady] = useState(false)
  const [progress, setProgress] = useState(0) // eslint-disable-line @typescript-eslint/no-unused-vars

  return (
    <SectionWrapper
      background={backgroundColor}
      containerClass="py-12 md:py-16 lg:py-12 "
      overlap={overlap}
    >
      <div className="flex flex-row items-center justify-between w-full">
        <h2 className="h2 font-sans">{title}</h2>
        <CarouselNavigation sliderRef={sliderRef} isReady={swiperReady} />
      </div>
      <div className="mt-16">
        <Swiper
          ref={sliderRef}
          slidesPerView={1}
          spaceBetween={40}
          modules={[Pagination]}
          onSlideChange={({ progress }) => setProgress(progress)}
          onInit={(swiper) => {
            setSwiperReady(true)
          }}
        >
          {images.map((image, idx) => (
            <SwiperSlide key={idx}>
              <div className="overflow-hidden aspect-video w-full rounded-lg">
                {image ? (
                  <Image
                    data={image}
                    className={classNames({
                      'w-full h-full transition-all duration-700': true,
                    })}
                    objectFit="cover"
                    objectPosition="center"
                  />
                ) : null}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </SectionWrapper>
  )
}

export default Gallery
