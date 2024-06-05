import type { FC } from 'react'
import Button from '../../Atoms/Button'
import SectionWrapper from '../../Atoms/SectionWrapper'

type Tag = {
  to: string
  label: string
  color: string
}

interface ExploreCategoriesProps {
  title: string
  overlap?: boolean
  rounded?: boolean
  tags: Tag[]
  button?: {
    label: string
    to: string
  }
}
const ExploreCategories: FC<ExploreCategoriesProps> = ({
  title,
  overlap,
  rounded,
  button,
  tags,
}) => {
  return (
    <SectionWrapper background="dove" overlap={overlap} rounded={rounded}>
      <div className="lg:flex items-center justify-between mb-8 lg:mb-14">
        <h5 className="body-s font-semibold uppercase">{title}</h5>
        {button ? (
          <Button
            extraClasses="max-lg:mt-6 uppercase"
            size="small"
            icon="ArrowRight"
            {...button}
          />
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 lg:gap-x-6 lg:gap-y-6">
        {tags.map((el, i) => (
          <Button key={i} variant="dot" {...el} />
        ))}
      </div>
    </SectionWrapper>
  )
}
export default ExploreCategories
