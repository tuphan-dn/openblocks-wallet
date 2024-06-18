import Brand from './brand'

import { Dialog, DialogPanel } from '@headlessui/react'

export type SplashProps = {
  open?: boolean
}

export default function Splash({ open = true }: SplashProps) {
  return (
    <Dialog onClose={() => {}} open={open}>
      <DialogPanel className="w-screen h-dvh flex flex-col justify-center items-center gap-4 bg-base-100/50 backdrop-blur fixed top-0 left-0 z-[9999]">
        <Brand />
        <progress className="progress progress-primary w-56" />
      </DialogPanel>
    </Dialog>
  )
}
