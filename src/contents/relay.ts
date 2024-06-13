import type { PlasmoCSConfig } from 'plasmo'
import { relayMessage, type MessagesMetadata } from '@plasmohq/messaging'

export const config: PlasmoCSConfig = {
  matches: ['http://localhost/*', 'https://*/*'],
}

const handlers: Array<keyof MessagesMetadata> = ['ping', 'sign']
handlers.forEach((name) => relayMessage({ name }))
