import { useBridge, Bridge, Registry } from 'lepont'
import { MSG_TYPE_SHARE, Options } from './shared'

type ShareModule = {
  open: (opts: any) => Promise<void>
}

export function useShare(registry: Registry, s: ShareModule) {
  useBridge(
    registry,
    MSG_TYPE_SHARE,
    async (p: Options, _: Bridge): Promise<void> => {
      await s.open(p)
    }
  )
}
