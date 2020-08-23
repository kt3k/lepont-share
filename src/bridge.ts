import { useBridge, Bridge, Registry } from 'lepont'
import { MSG_TYPE_SHARE, Options } from './shared'

type ShareModule = {
  open: (opts: any) => Promise<void>
}

export const ShareBridge = (s: ShareModule) => (registry: Registry): void =>
  registry.register(
    MSG_TYPE_SHARE,
    async (p: Options, _: Bridge): Promise<void> => {
      await s.open(p)
    }
  )
