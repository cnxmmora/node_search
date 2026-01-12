import { JanusClient, IOContext, InstanceOptions } from '@vtex/api'

export class SearchGraphqlClient extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        ...options?.headers,
      },
    })
  }

  public productSearch(variables: any) {
    return this.http.post(
      '/_v/graphql',
      {
        query: `
          query ProductSearch(
            $fullText: String
            $selectedFacets: [SelectedFacetInput!]
            $from: Int
            $to: Int
            $orderBy: String
            $operator: String
          ) {
            productSearch(
              fullText: $fullText
              selectedFacets: $selectedFacets
              from: $from
              to: $to
              orderBy: $orderBy
              operator: $operator
            ) {
              recordsFiltered
              products {
                productId
                productName
              }
            }
          }
        `,
        variables,
      },
      {
        headers: {
          'x-vtex-use-https': 'true',
        },
        metric: 'search-graphql',
      }
    )
  }
}