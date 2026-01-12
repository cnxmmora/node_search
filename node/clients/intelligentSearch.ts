import { IOContext, InstanceOptions, ExternalClient } from '@vtex/api'
import type { SearchResponse } from '../typings/search'

export class IntelligentSearchClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      '/api/io/_v/api/intelligent-search', // ✅ baseURL PRIMERO
      context,                             // ✅ context DESPUÉS
      options
    )
  }


  public search(params: any): Promise<SearchResponse> {
  return this.http.post<SearchResponse>(
    '/product_search',
    params,
    {
      metric: 'intelligent-search',
    }
  )
}
}
