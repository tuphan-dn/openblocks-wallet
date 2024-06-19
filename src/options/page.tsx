import General from './general'
import User from './user'

export default function Page() {
  return (
    <div className="w-full grid grid-cols-12 gap-4 p-4">
      <div className="col-span-full p-2">
        <User />
      </div>
      <div className="col-span-full">
        <General />
      </div>
    </div>
  )
}
