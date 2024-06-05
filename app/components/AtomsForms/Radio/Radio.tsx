import type { FC } from 'react'
import React, { useId } from 'react'

interface RadioProps {
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
   */
  defaultChecked?: boolean

  onChange?: Function
}

const Radio: FC<RadioProps> = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, name, defaultChecked = false, onChange }, radioRef) => {
    const id = useId()

    return (
      <div className="mb-2 flex items-center">
        <input
          ref={radioRef}
          id={id}
          name={name}
          type="radio"
          defaultChecked={defaultChecked}
          className="h-4 w-4  cursor-pointer text-black outline-none !ring-0"
          onChange={(e) => onChange && onChange(e.target.checked)}
        />
        <label
          htmlFor={id}
          className="body-s ml-2 block cursor-pointer font-sans leading-6 text-black"
        >
          {label}
        </label>
      </div>
    )
  },
)

Radio.displayName = 'Radio'
export default Radio
