import type { ServiceContext } from '@vtex/api'
import { json } from 'co-body'
import type { Clients } from '../clients'
import { intelligentSearch } from '../services/intelligentSearch'

export async function searchMiddleware(
  ctx: ServiceContext<Clients>,
  next: () => Promise<any>
) {
  const body = await json(ctx.req)
  console.log(body, 'estados_search')

  if (!body?.fullText) {
    ctx.status = 400
    ctx.body = { error: 'fullText is required' }
    return
  }

  const { fullText, from = 0, to = 10, collectionId } = body

  try {
    const result = await intelligentSearch(
      { fullText, from, to, collectionId },
      ctx
    )
    ctx.status = 200
    ctx.body = result
  } catch (error) {
    console.error('Error in search route:', error)
    ctx.status = 500
    ctx.body = { error: 'Internal server error' }
  }

  await next()
}
