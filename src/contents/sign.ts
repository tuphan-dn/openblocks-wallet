import type { PlasmoCSConfig } from 'plasmo'
import { sendToBackgroundViaRelay } from '@plasmohq/messaging'
import type { SignRequest, SignResponse } from '~background/messages/sign'

export const config: PlasmoCSConfig = {
  world: 'MAIN',
  matches: ['http://localhost/*', 'https://*/*'],
}

window.openblocks = Object.assign({}, window.openblocks, {
  sign: async function () {
    const re = await sendToBackgroundViaRelay<SignRequest, SignResponse>({
      name: 'sign',
      body: {
        msg: '123',
      },
    })
    return re
  },
})
