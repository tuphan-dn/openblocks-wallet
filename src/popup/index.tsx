import {
  createMemoryRouter,
  RouterProvider,
  Outlet,
  useNavigation,
} from 'react-router-dom'

import Error from '~components/error'
import Splash from '~components/splash'
import Page from './page'
import App from './app'
import Signin from './signin'

import UiProvider from '~providers/ui.provider'

function Layout() {
  const { state } = useNavigation()
  return (
    <UiProvider>
      <div className="w-full h-full grid grid-cols-1">
        <div className="col-span-full">
          <Outlet />
        </div>
      </div>
      <Splash open={state === 'loading'} />
    </UiProvider>
  )
}

const router = createMemoryRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Page />,
      },
      App,
      Signin,
    ],
  },
])

export default function Popup() {
  return <RouterProvider router={router} />
}
