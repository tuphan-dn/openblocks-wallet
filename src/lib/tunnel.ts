import { useEffect, useState } from 'react'

export const open = async (url: string): Promise<number | undefined> => {
  const { tabs: [tab] = [] } = await chrome.windows.create({
    type: 'popup',
    url,
    focused: true,
    width: 360,
    height: 640,
  })
  if (!tab?.id) return undefined
  return new Promise((resolve) => {
    const id = setInterval(() => {
      chrome.tabs
        .get(tab.id)
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

export const sendMessage = async <T, S>(
  tabId: number,
  body: T,
): Promise<S | string> => {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tabId, body, {}, resolve)
  })
}

export const useTunnel = <T, S>() => {
  const [tunnel, setTunnel] = useState<{
    body: T
    send: (args: S) => void
  }>()

  useEffect(() => {
    // The handler is really strict
    // It MUST NOT an async function
    // It MUST return true
    const handler = (body, _sender, send) => {
      setTunnel({ body, send })
      return true
    }
    chrome.runtime.onMessage.addListener(handler)
    return () => chrome.runtime.onMessage.removeListener(handler)
  }, [])

  return tunnel
}
