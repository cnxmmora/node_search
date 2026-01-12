import { ExternalClient, IOContext, InstanceOptions } from '@vtex/api'

export class SearchGraphqlClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      '/_v/graphql', // ✅ endpoint graphql interno
      context,
      options
    )
  }

  public productSearch(variables: any) {
    return this.http.post(
      '',
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
