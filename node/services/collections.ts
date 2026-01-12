import type { Context } from "../typings/typings"
export const getAllCollections = async (ctx: Context) => {
  const pages = [1, 2, 3]

  const responses = await Promise.all(
    pages.map(p => ctx.clients.catalog.getCollections(p))
  )

  return responses.flatMap(res => res?.items ?? [])
}
