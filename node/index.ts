import type { ClientsConfig } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'
import { Clients } from './clients'
import { searchMiddleware } from './middlewares/searchMiddleware'

const TIMEOUT_MS = 800

// Create a LRU memory cache for the Status client.
const memoryCache = new LRUCache<string, any>({ max: 5000 })
metrics.trackCache('status', memoryCache)

// Clients config
const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: { retries: 2, timeout: TIMEOUT_MS },
    status: { memoryCache },
  },
}

// Export service
export default new Service({
  clients,
  routes: {
    search: method({
      POST: [searchMiddleware],
    }),
  },
})
