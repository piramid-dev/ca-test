import { Switch } from '@headlessui/react'
import classNames from 'classnames'
import type { FC } from 'react'
import { useState, useEffect } from 'react'

interface SwitchSearchProps {
  /**
   * Toggle label rigth
   */
  rightLabel: string
  /**
   * Toggle label left
   */
  leftLabel: string
  /**
   * Is the toggle enabled?
   * @default false
   */
  selected?: string
  /**
   * Callback when toggle changes
   */
  onToggle?: (enabled: boolean) => void
}

const SwitchSearch: FC<SwitchSearchProps> = ({
  rightLabel,
  leftLabel,
  selected = leftLabel,
  onToggle,
}) => {
  const [enabled, setEnabled] = useState(selected === rightLabel)

  useEffect(() => {
    setEnabled(selected === rightLabel)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  const labelClasses =
    'body-xs font-sans font-semibold uppercase translate-y-[2px] transition-all duration-300'

  const handleChange = (value: boolean) => {
    setEnabled(value)
    if (onToggle) {
      onToggle(value)
    }
  }

  return (
    <div className="flex flex-row items-center justify-start">
      <div
        className={classNames({
          [labelClasses]: true,
          'mr-2': true,
          'text-black': !enabled,
          'text-black/30': enabled,
        })}
      >
        {leftLabel}
      </div>
      <Switch
        checked={enabled}
        onChange={handleChange}
        className={
          'relative bg-black/70 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
        }
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out shadow',
          )}
        />
      </Switch>
      <span
        className={classNames({
          [labelClasses]: true,
          'ml-2': true,
          'text-black': enabled,
          'text-black/30': !enabled,
        })}
      >
        {rightLabel}
      </span>
    </div>
  )
}

export default SwitchSearch
