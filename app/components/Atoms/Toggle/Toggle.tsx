import { Switch } from '@headlessui/react'
import classNames from 'classnames'
import { useState, useEffect, type FC } from 'react'

interface ToggleProps {
  /**
   * Toggle label
   */
  label: string
  /**
   * Is the toggle enabled?
   * @default false
   */
  enabled?: boolean
  /**
   * Callback when toggle changes
   */
  onToggle?: (enabled: boolean) => void
}

const Toggle: FC<ToggleProps> = ({ label, enabled = false, onToggle }) => {
  const [isEnabled, setIsEnabled] = useState(enabled)

  useEffect(() => {
    setIsEnabled(enabled)
  }, [enabled])

  const handleChange = (value: boolean) => {
    setIsEnabled(value)
    if (onToggle) {
      onToggle(value)
    }
  }

  return (
    <Switch.Group>
      <div className="flex flex-row items-center justify-start">
        <Switch
          checked={isEnabled}
          onChange={handleChange}
          className={classNames(
            isEnabled ? 'bg-black' : 'bg-black/70',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              isEnabled ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out shadow',
            )}
          />
        </Switch>
        <Switch.Label
          className={classNames({
            'body-s ml-2 font-sans translate-y-[2px] transition-all duration-300 cursor-pointer':
              true,
            'text-black': isEnabled,
            'text-black/70': !isEnabled,
          })}
        >
          {label}
        </Switch.Label>
      </div>
    </Switch.Group>
  )
}

export default Toggle
