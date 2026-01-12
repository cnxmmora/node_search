import type { Context } from '../typings/typings'

const normalizeText = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()

const textToVector = (text: string) => {
  const words = normalizeText(text).split(/\s+/)
  const vector: Record<string, number> = {}

  words.forEach((word) => {
    vector[word] = (vector[word] || 0) + 1
  })

  return vector
}

const cosineSimilarity = (
  vecA: Record<string, number>,
  vecB: Record<string, number>
) => {
  const intersection = Object.keys(vecA).filter((k) => k in vecB)

  const dotProduct = intersection.reduce(
    (sum, key) => sum + vecA[key] * vecB[key],
    0
  )

  const magnitude = (vec: Record<string, number>) =>
    Math.sqrt(Object.values(vec).reduce((sum, v) => sum + v * v, 0))

  return dotProduct / (magnitude(vecA) * magnitude(vecB) || 1)
}

const findBestCollectionMatch = (searchTerm: string, collections: any[]) => {
  const searchVector = textToVector(searchTerm)

  let bestMatch = {
    id: null as number | null,
    score: 0,
    name: '',
  }

  collections.forEach((col) => {
    const nameVector = textToVector(col.name)
    const score = cosineSimilarity(searchVector, nameVector)

    if (score > bestMatch.score) {
      bestMatch = {
        id: col.id,
        score,
        name: col.name,
      }
    }
  })

  return bestMatch
}

export const intelligentSearch = async (args: any, ctx: Context) => {
  try {
    const { fullText } = args

    // 1. Obtener todas las colecciones
    const firstPage = await ctx.clients.catalog.getCollections(1)
    const totalPages = firstPage?.paging?.pages || 1

    // Obtener las últimas 3 páginas
    const pagesToFetch = [totalPages, totalPages - 1, totalPages - 2].filter(
      (page) => page > 0
    )

    const responses = await Promise.all(
      pagesToFetch.map((page) => ctx.clients.catalog.getCollections(page))
    )

    const collections = responses.reduce((acc: any[], res: any) => {
      if (res?.items?.length) {
        acc.push(...res.items)
      }

      return acc
    }, [])

    console.log(`Found ${collections.length} collections`)

    // 2. Encontrar la mejor colección que coincida con el término de búsqueda
    const match = findBestCollectionMatch(fullText, collections)

    console.log('Best match:', match)

    if (!match?.id) {
      return { products: [] }
    }

    // 3. Buscar productos en esa colección
    const productsData = await ctx.clients.intelligentSearch.searchByCollection(
      match.id
    )

    console.log('Products found:', productsData)

    return productsData
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}