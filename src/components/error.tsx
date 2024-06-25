import { Link, useRouteError } from 'react-router-dom'

export default function Error() {
  const error: any = useRouteError()

  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center p-4">
      <h1 className="font-clash">Ewwww!</h1>
      <p className="text-center opacity-60">
        {error.statusText || error.message}
      </p>
      <Link className="btn btn-primary" to="/">
        Home
      </Link>
    </div>
  )
}
