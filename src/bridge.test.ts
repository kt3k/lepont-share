import * as React from 'react'
import { useShare } from './bridge'
import { useRegistry } from 'lepont'
import { renderHook } from '@testing-library/react-hooks'
import { MSG_TYPE_SHARE } from './shared'

const useApp = () => {
  const registry = useRegistry()
  useShare(registry, {
    async open() {},
  })
  return registry
}

describe('useShare', () => {
  it('registers share bridge', async () => {
    const { result } = renderHook(() => useApp())
    const webView = { injectJavaScript: jest.fn() }
    result.current.ref(webView)
    await result.current.onMessage({
      nativeEvent: {
        data: JSON.stringify({
          id: 1,
          message: {
            type: MSG_TYPE_SHARE,
            payload: { message: 'hello' },
          },
        }),
      },
    })
    const json = JSON.stringify({
      type: 'result',
      id: 1,
      message: {
        type: MSG_TYPE_SHARE,
      },
    })
    expect(webView.injectJavaScript).toHaveBeenCalledWith(
      `LePont.recv(${json})`
    )
  })
})
