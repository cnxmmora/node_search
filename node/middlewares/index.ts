import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { LRUCache, Service } from '@vtex/api'
import { Clients } from './clients'
import { intelligentSearch } from './services/intelligentSearch'
import { parseJsonBody } from './middlewares/parseJsonBody'

const TIMEOUT_MS = 800
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    status: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>
  interface State extends RecorderState {
    code: number
    body?: any
  }
}

export default new Service({
  clients,
  routes: {
    search: {
      path: '/_v/search',
      public: true,
      middlewares: [parseJsonBody],
      handler: async (ctx) => {
        const body = ctx.state.body
        console.log(body, "estados_body") // Aquí debe aparecer tu JSON

        if (!body?.fullText) {
          ctx.status = 400
          ctx.body = { error: 'fullText is required' }
          return
        }

        const { fullText, from = 0, to = 10, collectionId } = body
        try {
          const result = await intelligentSearch({ fullText, from, to, collectionId }, ctx)
          ctx.status = 200
          ctx.body = result
        } catch (error) {
          console.error('Error in search route:', error)
          ctx.status = 500
          ctx.body = { error: 'Internal server error' }
        }
      },
    }
  }
})
