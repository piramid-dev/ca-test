import type { FC } from 'react'
import { useState, useEffect, useRef } from 'react'
import { useAnimate } from 'framer-motion'
import ReactPlayer from 'react-player'

import ButtonIcon from '../../Atoms/ButtonIcon/ButtonIcon'

interface VideoLightboxProps {
  title?: string
  videoUrl: string
  videoCover: string
  alt?: string
}
const VideoLightbox: FC<VideoLightboxProps> = ({
  title,
  videoUrl,
  videoCover,
  alt,
}) => {
  const [openLightbox, setOpenLigthBox] = useState(false)
  const [isPlayingOnFullScreen, setIsPlayingOnFullScreen] = useState(false)

  const videoLBRef = useRef<any>(null)

  const playVideoOnLightBox = () => {
    setOpenLigthBox(true)
    setIsPlayingOnFullScreen(true)
  }

  const closeLightbox = () => {
    setOpenLigthBox(false)
    setIsPlayingOnFullScreen(false)
  }

  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (openLightbox) {
      animate(scope.current, { opacity: 1 }, { duration: 0.5 })
    }
  }, [openLightbox, scope, animate])

  return (
    <>
      {title ? (
        <h6 className="font-sans h5 text-center pt-6 -mb-2">{title}</h6>
      ) : null}
      <div className="h-[25vh] lg:h-screen container py-4 lg:py-10">
        <div className="lg:w-10/12 mx-auto h-full relative ">
          <img
            src={videoCover}
            alt={alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
            <ButtonIcon icon="Play" onClick={playVideoOnLightBox} />
          </div>
        </div>
        {openLightbox ? (
          <div
            ref={scope}
            className="fixed top-0 left-0 w-screen h-screen z-10 bg-black/90 flex justify-center items-center opacity-0"
          >
            <div className="absolute top-[20px] right-0  -translate-x-[100%]">
              <ButtonIcon icon="X" onClick={closeLightbox} />
            </div>
            <div className="overflow-hidden border border-black rounded-lg w-[90%] h-[90%]">
              <ReactPlayer
                ref={videoLBRef}
                playing={isPlayingOnFullScreen}
                muted={false}
                height="100%"
                width="100%"
                url={videoUrl}
                controls={true}
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}
export default VideoLightbox
