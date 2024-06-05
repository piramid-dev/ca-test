import { type FC } from 'react'
import type { Maybe } from '~/lib/generated'
import useDownload from '~/hooks/useDownload'
import Button from '../../Atoms/Button'

import 'swiper/swiper-bundle.min.css'

interface DownloadItemProps {
  slug?: string
  title: Maybe<string>
  button: {
    link?: Maybe<string>
    label: Maybe<string>
    target?: string
  }
  files?: (string | undefined)[] | null
}

const DownloadItem: FC<DownloadItemProps> = ({
  title,
  button,
  files,
  slug,
}) => {
  const { handleZip } = useDownload()
  let name = title?.replace(/\s+/g, '-').toLowerCase()
  name = slug ? `${slug}-${name}` : name

  return (
    <div className="flex items-center body-m font-semibold justify-between gap-x-4 my-10 border-b pb-6">
      <span className="translate-y-[2px]">{title}</span>
      {files ? (
        <Button
          label={button.label}
          icon="DownloadSimple"
          onClick={() => handleZip(files, name)}
        />
      ) : (
        <Button
          to={button.link}
          label={button.label}
          target={button.target}
          icon="DownloadSimple"
        />
      )}
    </div>
  )
}

export type { DownloadItemProps }
export default DownloadItem
