import { type ReactNode } from 'react'
import clsx from 'clsx'

import { X } from 'lucide-react'
import { Dialog, DialogPanel } from '@headlessui/react'

export type ModalProps = {
  open?: boolean
  onCancel?: () => void
  children: ReactNode
  visibleCloseButton?: boolean
  width?: string // https://daisyui.com/components/modal/#dialog-modal-with-custom-width
  height?: string
}

export default function Modal({
  open = false,
  onCancel = () => {},
  children,
  visibleCloseButton = true,
  width = '',
  height = '',
}: ModalProps) {
  return (
    <Dialog
      className={clsx('modal', { 'modal-open': open })}
      open={open}
      onClose={onCancel}
    >
      <DialogPanel
        className={clsx('modal-box', {
          [width]: !!width,
          [height]: !!height,
        })}
      >
        <button
          className={clsx(
            'btn btn-circle btn-ghost btn-xs absolute top-2 right-2',
            { hidden: !visibleCloseButton },
          )}
          onClick={onCancel}
        >
          <X className="w-4 h-4" />
        </button>
        {children}
      </DialogPanel>
    </Dialog>
  )
}
