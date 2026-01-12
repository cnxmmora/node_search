import { ExternalClient, IOContext, InstanceOptions } from '@vtex/api'

export class CatalogClient extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super('', ctx, options)
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
