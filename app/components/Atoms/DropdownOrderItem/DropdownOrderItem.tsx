import type { FC } from 'react'

interface DropdownOrderItemProps {
  /**
   * Order item label
   */
  label: string

  /**
   * type of sort
   * @default false
   */
  alphabetically?: boolean

  /**
   * direction of sort
   */
  direction?: 'asc' | 'desc'

  /**
   * On click callback
   */
  onClick?: () => void
}

const DropdownOrderItem: FC<DropdownOrderItemProps> = ({
  label,
  onClick,
  alphabetically = false,
  direction = 'asc',
}) => {
  return (
    <div
      onClick={onClick}
      className="group/wrapper flex cursor-pointer flex-row items-center  px-4 py-2 text-black transition-all duration-300 "
    >
      <span className="body-xs font-semibold text-black/80 font-sans group-hover/wrapper:underline">
        {label}
      </span>
    </div>
  )
}

export default DropdownOrderItem
