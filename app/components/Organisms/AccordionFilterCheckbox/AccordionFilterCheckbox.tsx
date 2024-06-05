import { useEffect, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import AccordionFilter from '../../Atoms/AccordionFilter/AccordionFilter'
import Checkbox from '../../AtomsForms/Checkbox'

interface AccordionFilterCheckboxProps {
  /**
   * Title of the accordion
   */
  label: string
  /**
   * Subject of the filters
   */
  subject: string
  /**
   * Array of checkboxes
   * @default []
   */
  checkboxes?: string[] | any[]
  /**
   * Array of active filters
   * @default []
   */
  activeFilters?: string[] | any[]

  /**
   * Is the accordion open?
   * @default false
   */
  isOpen?: boolean

  onChange?: Function
  icon?:
    | 'GridFour'
    | 'FilmStrip'
    | 'GlobeHemisphereWest'
    | 'Timer'
    | 'Folders'
    | 'Folder'
    | 'Translate'
}

const AccordionFilterCheckbox: FC<AccordionFilterCheckboxProps> = ({
  label,
  subject,
  checkboxes = [],
  activeFilters = [],
  isOpen = true,
  onChange,
  icon,
}) => {
  const { t } = useTranslation()
  const [checkboxesState, setCheckboxesState] = useState(
    checkboxes.map((c) => c.value),
  )
  const [infoLabel, setInfoLabel] = useState<string | null>(null)
  console.log('in', infoLabel)

  useEffect(() => {
    if (checkboxesState.some((c) => c) && !checkboxesState.every((c) => c)) {
      const filterLength = checkboxesState.filter((c) => c).length
      const filterLabel =
        filterLength === 1 ? t('filter-apply') : t('filter-apply-plural')

      setInfoLabel(`${filterLength} ${filterLabel}`)
    } else {
      setInfoLabel(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkboxesState])

  const handleOnChange = (e, idx, checkbox) => {
    const newCheckboxesState = [...checkboxesState]
    newCheckboxesState[idx] = e
    setCheckboxesState(newCheckboxesState)

    onChange &&
      onChange({
        ...checkbox,
        subject: subject,
        value: e,
      })
  }

  return (
    <AccordionFilter title={label} defaultOpen={isOpen} icon={icon}>
      {checkboxes.map((checkbox, idx) => (
        <Checkbox
          key={JSON.stringify(checkbox)}
          label={checkbox.name}
          name={checkbox.name}
          defaultChecked={activeFilters
            ?.find((item) => item.subject === subject)
            ?.values?.includes(checkbox.slug)}
          onChange={(e: any) => {
            handleOnChange(e, idx, checkbox)
          }}
        />
      ))}
    </AccordionFilter>
  )
}

export default AccordionFilterCheckbox
