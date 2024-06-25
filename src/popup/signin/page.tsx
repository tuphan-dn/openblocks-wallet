import { z } from 'zod'

import Panel from './panel'
import Stack from './stack'
import PasswordBox from './box/password'
import SocialBox from './box/social'
import LockBox from './box/lock'

import { useSafeRouteLoaderData } from '~lib/hooks/useLoader'

export default function Page() {
  const { layout } = useSafeRouteLoaderData(
    'signin',
    z.object({ layout: z.array(z.enum(['social', 'password', 'lock'])) }),
  )

  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="grow w-[calc(100%+2rem)] h-0 -m-4">
        <Panel />
      </div>
      <Stack
        items={[
          {
            id: 'social',
            children: <SocialBox />,
          },
          {
            id: 'password',
            children: <PasswordBox />,
          },
          {
            id: 'lock',
            children: <LockBox />,
          },
        ]}
        layout={layout}
      />
    </div>
  )
}
