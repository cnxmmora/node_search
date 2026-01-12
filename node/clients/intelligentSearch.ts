import { IOContext, InstanceOptions, ExternalClient } from '@vtex/api'
import type { SearchResponse } from '../typings/search'

export class IntelligentSearchClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      `http://${context.account}.vtexcommercestable.com.br`,
      context,
      {
        ...options,
        headers: {
          ...options?.headers,
          'REST-Range': 'resources=0-49',
        },
      }
    )
  }

  public searchByCollection(collectionId: number): Promise<SearchResponse> {
    const facets = `productClusterIds/${collectionId}`
    
    return this.http.get<SearchResponse>(
      `/api/io/_v/api/intelligent-search/product_search/${facets}`,
      {
        params: {
          locale: 'es-CO',
        },
        metric: 'intelligent-search-collection',
      }
    )
  }
}