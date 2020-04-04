export const MSG_TYPE_SHARE = '@lepont/share/share'

export type Options = {
  /** array of base64 string you want to share */
  urls?: string[]

  /** array of filename for base64 urls array (only works for Android */
  filenames: string[]

  /** File mime type ex. "image/png" */
  type?: string

  /** The message to share */
  message?: string

  /** The title of the message */
  title?: string
}
