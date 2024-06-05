import classNames from 'classnames'
import type { FC } from 'react'
import React, { useState, useEffect, useId } from 'react'

interface TextareaProps {
  // resetField?: UseFormResetField<FieldValues>
  resetField?: (name: string) => void

  validation?: {}

  /**
   * Error message
   * @optional
   */
  error?: { message: string; type: string }

  /**
   * Textarea name
   */
  name: string

  /**
   * Textarea help text
   * @optional
   */
  helpText?: string

  /**
   * Textarea label
   */
  label?: string

  /**
   * Textarea placeholder
   * @optional
   * @default ''
   */

  placeholder?: string
  /**
   * Is the input disabled?
   * @default false
   * @optional
   */

  disabled?: boolean

  value?: string

  onFocus?: () => void

  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const Textarea: FC<TextareaProps> = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(
  (
    {
      resetField,
      validation,
      error,
      name = '',
      label = '',
      placeholder = '',
      disabled = false,
      helpText,
      onFocus,
      onChange,
      value,
      ...rest
    },
    textareaRef,
  ) => {
    const id = useId()
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
      if (error) {
        setHasError(true)
      } else {
        setHasError(false)
      }
    }, [error])

    return (
      <div className="body-s font-sans">
        {label ? (
          <label htmlFor={id} className="block">
            {label}
          </label>
        ) : null}
        <div className="relative mt-1 shadow-sm">
          <textarea
            ref={textareaRef}
            name={name}
            id={id}
            rows={3}
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange && onChange(e)}
            className={classNames({
              'cursor-not-allowed bg-black/30 ring-0 placeholder:text-black':
                disabled,
              'block w-full rounded-md border-0 py-1.5 text-black/70 ring-inset ring-black/30 transition-all duration-300 shadow-sm ring-1 placeholder:font-sans placeholder:text-black/30 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6':
                true,
              'ring-red-500': hasError,
            })}
          />
        </div>
        {helpText && !hasError ? (
          <p className="mt-1 text-black/70">{helpText}</p>
        ) : null}
        {hasError ? (
          <p className="mt-1 text-red-500">{error!.message}</p>
        ) : null}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

export default Textarea
