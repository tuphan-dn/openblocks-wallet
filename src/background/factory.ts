import type { MessagesMetadata, PlasmoMessaging } from '@plasmohq/messaging'
import { z } from 'zod'
import { diagnosisError } from '~lib/utils'

export function factory<T, S>(
  bodydto: z.ZodSchema<T>,
  datadto: z.ZodSchema<S>,
  handler: (
    req: PlasmoMessaging.Request<
      keyof MessagesMetadata,
      z.output<typeof bodydto>
    > & { body: z.output<typeof bodydto> },
  ) => Promise<z.input<typeof datadto>>,
): PlasmoMessaging.MessageHandler<
  z.input<typeof bodydto>,
  z.output<typeof datadto> | string
> {
  return async (req, res) => {
    try {
      const re = await handler({ ...req, body: bodydto.parse(req.body) })
      const data = datadto.parse(re)
      return res.send(data)
    } catch (er) {
      return res.send(diagnosisError(er))
    }
  }
}
