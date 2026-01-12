import { IOContext, InstanceOptions, JanusClient } from '@vtex/api'
import type { SearchResponse } from '../typings/search'

export class IntelligentSearchClient extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        ...options?.headers,
      },
    })
  }

  public searchByCollection(collectionId: number): Promise<SearchResponse> {
    // El formato correcto según la documentación es usar facets
    const facets = `productClusterIds/${collectionId}`
    
    return this.http.get<SearchResponse>(
      `/product_search/${facets}`,
      {
        params: {
          locale: 'es-CO', // opcional, ajusta según tu región
        },
        metric: 'intelligent-search-collection',
      }
    )
  }

  // Método alternativo si necesitas búsqueda sin colección
  public search(params: any): Promise<SearchResponse> {
    const { fullText } = params
    
    return this.http.get<SearchResponse>(
      `/product_search/${fullText}`,
      {
        params: {
          locale: 'es-CO',
        },
        metric: 'intelligent-search',
      }
    )
  }
}