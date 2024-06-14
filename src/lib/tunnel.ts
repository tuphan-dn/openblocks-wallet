import { useEffect, useState } from 'react'

export const openWindow = async (url: string): Promise<number | undefined> => {
  const { tabs: [tab] = [] } = await chrome.windows.create({
    type: 'popup',
    url,
    focused: true,
    width: 360,
    height: 640,
  })
  return new Promise((resolve) => {
    if (!tab?.id) return resolve(undefined)
    const id = setInterval(() => {
      chrome.tabs
        .get(tab.id!)
        .then(({ status }) => {
          if (status === 'complete') resolve(tab.id)
        })
        .catch(() => {
          resolve(undefined)
        })
        .finally(() => {
          clearInterval(id)
        })
    }, 1000)
  })
}

export const sendMessageToTunnel = async <T, S>(
  tabId: number,
  body: T,
): Promise<S> => {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, body, {}, (re) => {
      if (typeof re === 'string') reject(re)
      else resolve(re)
    })
  })
}

export const useTunnel = <T, S>() => {
  const [tunnel, setTunnel] = useState<{
    body: T
    send: (args: S | string) => void
  }>()

  useEffect(() => {
    // The handler is really strict
    // It MUST NOT an async function
    // It MUST return true
    const handler = (
      body: T,
      _sender: chrome.runtime.MessageSender,
      send: (args: S | string) => void,
    ) => {
      setTunnel({ body, send })
      return true
    }
    chrome.runtime.onMessage.addListener(handler)
    return () => chrome.runtime.onMessage.removeListener(handler)
  }, [])

  return tunnel
}
