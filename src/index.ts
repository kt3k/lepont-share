import { MSG_TYPE_SHARE, Options } from './shared'
import { sendMessage } from 'lepont/browser'

export async function share(options: Options): Promise<void> {
  await sendMessage<void, Options>({
    type: MSG_TYPE_SHARE,
    payload: options,
  })
}
