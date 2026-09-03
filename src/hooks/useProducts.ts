import { useQuery } from '@tanstack/react-query'
import { productResponseSchema } from '../schemas/productSchemas'

const PRODUCTS_API = 'https://dummyjson.com/products'

const fetchProducts = async () => {
  const response = await fetch(PRODUCTS_API)

  if (!response.ok) {
    throw new Error(
      `Unable to fetch products. Server returned ${response.status}.`,
    )
  }

  const data: unknown = await response.json()

  const result = productResponseSchema.safeParse(data)

  if (!result.success) {
    console.error('Product API validation error:', result.error)

    throw new Error(
      'The product data received from the server is invalid.',
    )
  }

  return result.data
}

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
}