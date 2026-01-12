import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { LRUCache, Service } from '@vtex/api'
import { Clients } from './clients'
import { intelligentSearch } from './services/intelligentSearch'

type SearchArgs = {
  fullText: string
  from?: number
  to?: number
  collectionId?: string
}

const TIMEOUT_MS = 800

// Crear cache LRU en memoria
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

// Configuración de los clients disponibles en ctx.clients
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
  }
}

// Servicio VTEX Node completo
export default new Service({
  clients,
  routes: {
   search: async (ctx: ServiceContext<Clients>) => {
    const body = ctx.body as Partial<SearchArgs> | undefined
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
  }
  },
})
