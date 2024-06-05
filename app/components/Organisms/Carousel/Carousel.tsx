import React, { useRef, useState, useEffect, type FC } from 'react'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Maybe } from '~/lib/generated'

import Button from '../../Atoms/Button'
import Chip from '../../Atoms/Chip'
import SectionWrapper from '../../Atoms/SectionWrapper'
import CarouselNavigation from '../../Molecules/CarouselNavigation'

import 'swiper/swiper-bundle.min.css'

interface CarouselProps {
  pretitle?: Maybe<string>
  title?: Maybe<string>
  content?: Maybe<string>
  image?: Maybe<string>
  category?: {
    label: Maybe<string>
    color: Maybe<string>
  }
  eyelet?: Maybe<string>
  children: React.ReactElement[]
  button?: {
    label: string
    to: Maybe<string>
  }
  overlap?: boolean
  backgroundColor?: 'dove' | 'white' | 'black' | 'transparent' | string
}

const Carousel: FC<CarouselProps> = ({
  pretitle,
  title,
  content,
  image,
  button,
  category,
  children,
  eyelet,
  backgroundColor = 'dove',
  overlap,
  ...props
}) => {
  const sliderRef = useRef<any>(null)
  const [swiperReady, setSwiperReady] = useState(false)
  const [progress, setProgress] = useState(0) // eslint-disable-line @typescript-eslint/no-unused-vars
  const [hideNav, setHideNav] = useState(false)

  useEffect(() => {
    console.log('slider ref', sliderRef.current?.swiper)
    if (sliderRef.current?.swiper) {
      setHideNav(
        sliderRef.current.swiper.isBeginning && sliderRef.current.swiper.isEnd,
      )
    }
  }, [sliderRef])
  return (
    <SectionWrapper
      background={backgroundColor}
      containerClass="py-12 md:py-16 lg:py-12 "
      sectionClass="relative"
      overlap={overlap}
    >
      <div className="flex flex-col gap-y-8 md:flex-row justify-between w-full mb-8 md:mb-12">
        <div className="md:w-7/12 lg:w-2/3  flex flex-col gap-y-8">
          {category ? <Chip {...category} extraClasses="mb-4 md:mb-8" /> : null}
          {eyelet ? (
            <h6 className="mb-4 md:mb-8 uppercase body-s semibold">{eyelet}</h6>
          ) : null}
          <div>
            {pretitle ? (
              <h2 className="h2 font-sans mb-2">{pretitle}</h2>
            ) : null}
            {title ? <h2 className="h2 font-sans">{title}</h2> : null}
          </div>
          {content ? <div>{content}</div> : null}
          {button ? (
            <Button
              {...button}
              icon="ArrowRight"
              extraClasses="max-md:hidden lg:mt-auto"
              color={backgroundColor === 'black' ? 'white' : 'black'}
            />
          ) : null}
        </div>

        <div className="md:w-5/12 lg:w-3/12   flex flex-col gap-y-8">
          {image ? (
            <img
              src={image}
              className="max-md:mx-auto md:mb-4"
              alt={title ? title : ''}
            />
          ) : null}
          <div className="flex justify-between md:inline-block md:ml-auto md:mt-auto">
            {button ? (
              <Button
                {...button}
                icon="ArrowRight"
                extraClasses="md:hidden"
                color={backgroundColor === 'black' ? 'white' : 'black'}
              />
            ) : null}
            {!hideNav ? (
              <CarouselNavigation
                darkMode={backgroundColor === 'black'}
                sliderRef={sliderRef}
                isReady={swiperReady}
              />
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Swiper
          ref={sliderRef}
          breakpoints={{
            0: {
              slidesPerView: 1.3,
              spaceBetween: 16,
            },
            580: {
              slidesPerView: 2.3,
              spaceBetween: 16,
            },
            1024: {
              //slidesPerView: 3.3,
              slidesPerView: 4,
              spaceBetween: 12,
            },
          }}
          modules={[Navigation]}
          onSlideChange={({ progress }) => setProgress(progress)}
          onInit={(swiper) => {
            setSwiperReady(true)
          }}
          watchOverflow
          className="!overflow-visible p-2"
        >
          {children.map((child, idx) => (
            <SwiperSlide key={idx}>{child}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </SectionWrapper>
  )
}

export default Carousel
