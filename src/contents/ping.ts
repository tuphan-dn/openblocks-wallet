import type { PlasmoCSConfig } from 'plasmo'
import { sendToBackgroundViaRelay } from '@plasmohq/messaging'

export const config: PlasmoCSConfig = {
  world: 'MAIN',
  matches: ['http://localhost/*', 'https://*/*'],
}

window.addEventListener('load', () => {
  console.log('content script loaded')
  window.openblocks = {
    ping: async function () {
      const resp = await sendToBackgroundViaRelay({
        name: 'ping',
        body: {
          id: 123,
        },
      })

      console.log(resp)
    },
  }
})
