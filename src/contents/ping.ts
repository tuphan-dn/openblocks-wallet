import type { PlasmoCSConfig } from 'plasmo'
import { sendToBackgroundViaRelay } from '@plasmohq/messaging'
import type { PingRequest, PingResponse } from '~background/messages/ping'

export const config: PlasmoCSConfig = {
  world: 'MAIN',
  matches: ['http://localhost/*', 'https://*/*'],
}

window.addEventListener('load', () => {
  console.log('👍 Openblocks Wallet is injected')
  window.openblocks = {
    ping: async function () {
      const resp = await sendToBackgroundViaRelay<PingRequest, PingResponse>({
        name: 'ping',
        body: {
          id: 123,
        },
      })

      console.log(resp)
    },
  }
})
