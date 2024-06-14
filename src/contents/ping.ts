import type { PlasmoCSConfig } from 'plasmo'
import { sendToBackgroundViaRelay } from '@plasmohq/messaging'
import type { PingRequest, PingResponse } from '~background/messages/ping'
import { v4 } from 'uuid'

export const config: PlasmoCSConfig = {
  world: 'MAIN',
  matches: ['http://localhost/*', 'https://*/*'],
}

window.openblocks = Object.assign(window.openblocks || {}, {
  ping: async function () {
    const re = await sendToBackgroundViaRelay<PingRequest, PingResponse>({
      name: 'ping',
      body: {
        id: v4(),
      },
    })
    return re
  },
})
