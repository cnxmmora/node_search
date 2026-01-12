import { IOClients } from '@vtex/api'
import { CatalogClient } from './catalog'
import { IntelligentSearchClient } from './intelligentSearch'
import { SearchGraphqlClient } from './searchGraphql'

export class Clients extends IOClients {
  public get catalog() {
    return this.getOrSet('catalog', CatalogClient)
  }

  public get intelligentSearch() {
    return this.getOrSet('intelligentSearch', IntelligentSearchClient)
  }

    public get searchGraphql() {
    return this.getOrSet('searchGraphql', SearchGraphqlClient)
  }
}
