import { Link, useRouteError } from 'react-router-dom'

export default function Error() {
  const error: any = useRouteError()

  return (
    <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
      <p className="text-center">{error.statusText || error.message}</p>
      <Link className="btn btn-primary" to="/">
        Home
      </Link>
    </div>
  )
}
