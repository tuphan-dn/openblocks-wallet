import UiProvider from '~providers/ui.provider'

export default function Support() {
  return (
    <UiProvider>
      <div className="w-full h-full grid grid-cols-1">
        <div className="col-span-full">
          <div className="flex flex-col gap-4 p-4">
            <span>Support</span>
          </div>
        </div>
      </div>
    </UiProvider>
  )
}
