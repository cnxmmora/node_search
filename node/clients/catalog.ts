import { JanusClient, IOContext, InstanceOptions } from '@vtex/api'

export class CatalogClient extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie: ctx.authToken,
      },
    })
  }

  public getCollections(page: number) {
    return this.http.get('/api/catalog_system/pvt/collection/search', {
      params: {
        page,
        pageSize: 50,
        orderByAsc: true,
      },
      metric: 'get-collections',
    })
  }
}