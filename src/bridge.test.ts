import * as React from 'react'
import { ShareBridge } from './bridge'
import { useBridge } from 'lepont'
import { renderHook } from '@testing-library/react-hooks'
import { MSG_TYPE_SHARE } from './shared'

const useApp = () =>
  useBridge(
    ShareBridge({
      async open() {},
    })
  )

describe('ShareBridge', () => {
  it('registers share bridge', async () => {
    const {
      result: {
        current: [ref, onMessage],
      },
    } = renderHook(() => useApp())
    const webView = { injectJavaScript: jest.fn() }
    ref(webView)
    await onMessage({
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
