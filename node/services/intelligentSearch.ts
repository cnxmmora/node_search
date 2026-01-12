import type { Context } from '../typings/typings'

export const intelligentSearch = async (args: any, ctx: Context) => {
  try {
    // Llamada al cliente que creaste
    const result = await ctx.clients.intelligentSearch.search(args)
    return result
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}
