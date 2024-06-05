import type { FC } from 'react'
import { useIsSubmitting } from 'remix-validated-form'

import Button from '~/components/Atoms/Button'

interface SubmitProps {
  /**
   * Submit contents
   */
  label?: string
  children?: string
  disabled?: boolean
}

/**
 * Submit button, wrapper of Button
 */
const Submit: FC<SubmitProps> = ({
  label = '',
  children = '',
  disabled,
  ...props
}) => {
  const isSubmitting = useIsSubmitting()
  const _label = isSubmitting ? 'Submitting...' : label || children

  return (
    <Button
      type="submit"
      {...props}
      label={_label}
      icon="ArrowRight"
      containerClassName="w-full"
      disabled={isSubmitting || disabled}
    />
  )
}

export default Submit
