import { useCallback, type FC } from 'react'
import classNames from 'classnames'

import ButtonIcon from '~/components/Atoms/ButtonIcon'

interface CarouselNavigationProps {
  sliderRef: any
  darkMode?: boolean
  isReady?: boolean
}

const CarouselNavigation: FC<CarouselNavigationProps> = ({
  sliderRef,
  isReady = false,
  darkMode = false,
}) => {
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slidePrev()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slideNext()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  //  console.log("SWIPER REF progrss: ", sliderRef?.current?.swiper.progress)
  //  console.log("SWIPER REF next: ", sliderRef?.current?.swiper.allowSlideNext)
  return (
    <div className="flex items-center gap-x-6">
      <div
        className={classNames({
          'lg:block transition-all duration-300': true,
          'opacity-0': !isReady,
        })}
      >
        <ButtonIcon
          icon="ArrowLeft"
          onClick={handlePrev}
          variant="outline"
          darkMode={darkMode}
          disabled={
            isReady
              ? sliderRef?.current?.swiper?.activeIndex === 0 ||
                !sliderRef?.current?.swiper?.allowSlidePrev
              : undefined
          }
        />
      </div>
      <div
        className={classNames({
          'lg:block transition-all duration-300': true,
          'opacity-0': !isReady,
        })}
      >
        <ButtonIcon
          disabled={
            isReady
              ? sliderRef?.current?.swiper?.progress >= 1 ||
                !sliderRef?.current?.swiper?.allowSlideNext
              : undefined
          }
          variant="outline"
          darkMode={darkMode}
          icon="ArrowRight"
          onClick={handleNext}
        />
      </div>
    </div>
  )
}

export default CarouselNavigation
