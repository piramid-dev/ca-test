import classNames from 'classnames'
import type { FC } from 'react'
import React, { useId } from 'react'

interface CheckboxProps {
  /**
   * Checkbox label
   * @optional
   */
  label?: string

  /**
   * Checkbox name
   */
  name: string

  /**
   * Checkbox default checked
   * @default false
   * @optional
   */
  defaultChecked?: boolean

  onChange?: Function

  color?: string
}

const Checkbox: FC<CheckboxProps> = React.forwardRef<
  HTMLInputElement,
  CheckboxProps
>(({ label, name, defaultChecked, onChange, color }, checkboxRef) => {
  const id = useId()
  return (
    <div className="relative mb-2 ml-1 flex items-start z-10 checkbox">
      <div className="flex h-6 items-center">
        <input
          ref={checkboxRef}
          id={id}
          name={name}
          type="checkbox"
          style={{
            backgroundColor: defaultChecked ? color : undefined,
            borderColor: color || undefined,
            // @ts-ignore: hacking tailwindcss ring
            '--tw-ring-color': color || undefined,
          }}
          className={classNames({
            'z-40 h-4 w-4 rounded cursor-pointer text-black border-2': true,
            'focus:ring-black': label !== undefined && !color,
            'focus:ring-0': label === undefined,
            'border-black/70': !color,
            'bg-transparent': !defaultChecked,
          })}
          checked={defaultChecked}
          onChange={(e) => onChange && onChange(e.target.checked)}
        />
      </div>
      {label ? (
        <div className="ml-2 text-sm leading-6 cb-label">
          <label htmlFor={id} className="body-s font-sans text-black/70">
            {label}
          </label>
        </div>
      ) : null}
    </div>
  )
})

Checkbox.displayName = 'Checkbox'
export default Checkbox
