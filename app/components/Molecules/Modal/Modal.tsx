import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { Fragment, useEffect, useState, type FC } from 'react'

import ButtonIcon from '../../../components/Atoms/ButtonIcon'

interface ModalProps {
  title?: string
  size?: 'full'
  children?: React.ReactNode
  showModal?: boolean
  onClose: (value: boolean) => void
}

const Modal: FC<ModalProps> = ({
  title,
  size,
  children,
  showModal = false,
  onClose,
}) => {
  const [open, setOpen] = useState(showModal)
  useEffect(() => {
    setOpen(showModal)
  }, [showModal])

  const handleClose = (event: any) => {
    setOpen(false)
    onClose(false)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog className="relative z-10" onClose={handleClose}>
        {size !== 'full' ? (
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-20 transition-opacity"
              onClick={handleClose}
            />
          </Transition.Child>
        ) : null}
        <div className="fixed max-md:top-1/2 max-md:-translate-y-1/2 max-md:inset-x-0  md:inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={classNames({
                  'relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:p-6':
                    true,
                  'md:max-w-[80%] lg:max-w-[660px]': size !== 'full',
                })}
              >
                <div className="flex justify-between items-center">
                  <span className="text-black/70 body-m font-semibold">
                    {title}
                  </span>
                  <ButtonIcon
                    variant="outline"
                    size="small"
                    icon="X"
                    onClick={handleClose}
                  />
                </div>
                <div>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
