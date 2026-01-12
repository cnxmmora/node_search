import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { LRUCache, Service } from '@vtex/api'
import { Clients } from './clients'
import { intelligentSearch } from './services/intelligentSearch'

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
      let body: any
      
      console.log(body,"holas_mis_Datos_2");
      
      try {
        // Esto lee el body como texto y luego lo parsea
        const text =  JSON.stringify(ctx.request)
        body = JSON.parse(text)
       
        
      } catch (err) {
        console.error('Error parsing body', err)
        ctx.status = 400
        ctx.body = { error: 'Invalid JSON' }
        return
      }

      console.log(body, 'estados_search')

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
  },
})
