import { useState, type FC } from 'react'

import AccordionFilter from '../../Atoms/AccordionFilter/AccordionFilter'
import Radio from '../../AtomsForms/Radio/Radio'

interface AccordionFilterRadioProps {
  /**
   * Title of the accordion
   */
  label: string

  /**
   * Array of radios
   * @default []
   */
  radios?: {
    name: string
    label: string
    value: boolean
  }[]

  /**
   * Is the accordion open?
   * @default false
   */
  isOpen?: boolean

  locked?: boolean

  onChange?: Function
}

const AccordionFilterRadio: FC<AccordionFilterRadioProps> = ({
  label,
  radios = [],
  isOpen = false,
  locked = false,
  onChange,
}) => {
  const [radiosState, setRadiosState] = useState(radios.map((c) => c.value))

  return (
    <AccordionFilter
      title={label}
      defaultOpen={isOpen}
      infoLabel={radiosState.some((c) => c) ? 'Filtri, applicati' : ''}
      locked={locked}
    >
      {radios.map((radio, idx) => (
        <Radio
          key={JSON.stringify(radio)}
          label={radio.label}
          name={radio.name}
          defaultChecked={radio.value}
          onChange={(e: any) => {
            const newRadiosState = [...radiosState]
            newRadiosState.map((_, i) => (i === idx ? e : false))
            setRadiosState(newRadiosState)

            onChange && onChange(e)
          }}
        />
      ))}
    </AccordionFilter>
  )
}

export default AccordionFilterRadio
