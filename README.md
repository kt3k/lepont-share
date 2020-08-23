# @lepont/share v0.2.1

![ci](https://github.com/kt3k/lepont-share/workflows/ci/badge.svg?)
[![codecov](https://codecov.io/gh/kt3k/lepont-share/branch/master/graph/badge.svg)](https://codecov.io/gh/kt3k/lepont-share)

> Share messages and files from browser, a [lepont][] plugin

# Install

After initializing react-native:

```
npm i --save lepont @lepont/share react-native-share
# or
yarn add lepont @lepont/share react-native-share
```

And then:

```
npx pod-install
```

# Usage

React Native side:

```ts
import { useBridge } from 'lepont'
import { ShareBridge } from '@lepont/share/bridge'
import Share from 'react-native-share'
import { WebView } from 'react-native-webview'

const App = () => {
  const [ref, onMessage] = useRegistry(ShareBridge(Share))

  return (
    <WebView
      source={{ uri: 'Web.bundle/index.html' }}
      javaScriptEnabled
      ref={ref}
      onMessage={onMessage}
    />
  )
}

export default App
```

Browser side:

```ts
import { share } from '@lepont/share'

await share({
  message: 'Share from my app!'
})
```

# API

```
import { share } from '@lepont/share'
```

## `share(options: Options): Promise<void>`

```ts
type Options = {
  /** array of base64 string you want to share */
  urls?: string[]

  /** array of filename for base64 urls array (only works for Android */
  filenames?: string[]

  /** File mime type ex. "image/png" */
  type?: string

  /** The message to share */
  message?: string

  /** The title of the message */
  title?: string
}
```

Shares the given contents and sends the data to other Apps.

# License

MIT

[lepont]: https://github.com/kt3k/lepont
[react-native]: https://reactnative.dev/
