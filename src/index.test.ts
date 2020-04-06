import { share } from './index'
import { MSG_TYPE_SHARE } from './shared'
import { ReactNativeWebView } from 'lepont/mock'

beforeEach(() => {
  jest.spyOn(ReactNativeWebView, 'postMessage')
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('share', () => {
  it('sends the message to ReactNativeWebView', async () => {
    const p = share({ message: 'hello' })

    const postMessage = ReactNativeWebView.postMessage

    const { id } = JSON.parse((postMessage as any).mock.calls[0][0])

    expect(postMessage).toHaveBeenCalledWith(
      JSON.stringify({
        id,
        message: {
          type: MSG_TYPE_SHARE,
          payload: {
            message: 'hello',
          },
        },
      })
    )
    ;(window as any).LePont.onResult({
      id,
      message: { type: '', payload: '' },
      error: null,
    })

    await p
  })
})
