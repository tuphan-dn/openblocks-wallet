import Notification from './notification'
import Theme from './theme'

export default function General() {
  return (
    <div className="flex flex-col gap-2">
      <p className="w-full opacity-60 ml-4 text-sm font-clash font-semibold tracking-wider">
        General
      </p>
      <div className="w-full bg-base-100/25 backdrop-blur rounded-3xl p-4 grid grid-cols-4 gap-4">
        <div className="col-span-2 aspect-square grid grid-cols-2 gap-2">
          <Theme className="col-span-1" />
          <Notification className="col-span-1" />
        </div>
        <div className="col-span-2 aspect-square bg-base-100/20 backdrop-blur rounded-box shadow-outer"></div>
      </div>
    </div>
  )
}
