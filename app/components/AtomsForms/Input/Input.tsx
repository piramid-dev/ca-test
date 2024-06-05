import classNames from 'classnames'
import { XCircle } from 'phosphor-react'
import type { FC } from 'react'
import React, { useState, useEffect, useId } from 'react'
import { useField } from 'remix-validated-form'

interface InputProps {
  // resetField?: UseFormResetField<FieldValues>
  resetField?: (name: string) => void
  validation?: {}
  /**
   * Error message
   * @optional
   */

  error?: { message: string; type: string }
  /**
   * Input name
   */

  name?: string
  /**
   * Input type
   * @default 'text'
   */

  type?: 'text' | 'password' | 'email' | 'number'
  /**
   * Input help text
   * @optional
   */
  helpText?: string

  /**
   * Input label
   */
  label?: string

  /**
   * Input placeholder
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
  /**
   * defaultValue for the input field
   * @default ''
   * @optional
   */
  defaultValue?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  formId?: string
}

const Input: FC<InputProps> = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      resetField,
      onChange,
      validation,
      error,
      name = '',
      type = 'text',
      label = '',
      placeholder = '',
      disabled = false,
      helpText,
      formId = '',
      ...rest
    },
    inputRef,
  ) => {
    const id = useId()
    const [hasError, setHasError] = useState(error !== undefined)
    const { error: validationError, getInputProps } = useField(name, {
      formId,
    })

    // Using error from props or from validation
    const _error = error?.message || validationError

    useEffect(() => {
      if (_error) {
        setHasError(true)
      } else {
        setHasError(false)
      }
    }, [_error])

    return (
      <div className="body-s font-sans">
        <label htmlFor={id} className="block">
          {label}
        </label>
        <div className="relative mt-1 shadow-sm">
          <input
            {...rest}
            {...getInputProps({
              id,
              onChange,
              disabled,
              type,
            })}
            ref={inputRef}
            placeholder={placeholder ? placeholder : label}
            className={classNames({
              'cursor-not-allowed bg-black/30 ring-0 placeholder:text-black':
                disabled,
              'block w-full rounded-md border-0 py-1.5 text-black/70 ring-inset ring-black/30 transition-all duration-300 shadow-sm ring-1 placeholder:font-sans placeholder:text-black/30 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6':
                true,
              '!ring-red-500': hasError,
            })}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <XCircle
              className={classNames({
                'h-5 w-5 cursor-pointer text-red-500': true,
                hidden: !hasError,
              })}
            />
          </div>
        </div>
        {helpText && !hasError ? (
          <p className="mt-1 text-black/70">{helpText}</p>
        ) : null}
        {hasError ? <p className="mt-1 text-red-500">{_error}</p> : null}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
