import { useEffect, useMemo, useState } from 'react'
import type { Product } from '../types/product'
import { useDebounce } from './useDebounce'

export type SortOption =
  | 'default'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'name-asc'
  | 'name-desc'

interface UseProductFiltersResult {
  searchTerm: string
  category: string
  minPrice: number
  maxPrice: number
  sortBy: SortOption

  priceRange: {
    min: number
    max: number
  }

  filteredProducts: Product[]
  categories: string[]

  setSearchTerm: (value: string) => void
  setCategory: (value: string) => void
  setMinPrice: (value: number) => void
  setMaxPrice: (value: number) => void
  setSortBy: (value: SortOption) => void
  clearFilters: () => void
}

export const useProductFilters = (
  products: Product[],
): UseProductFiltersResult => {
  const priceRange = useMemo(() => {
    if (products.length === 0) {
      return {
        min: 0,
        max: 100,
      }
    }

    const prices = products.map(
      (product) => product.price,
    )

    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    }
  }, [products])

  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] =
    useState<SortOption>('default')

  const [minPrice, setMinPrice] = useState(
    priceRange.min,
  )

  const [maxPrice, setMaxPrice] = useState(
    priceRange.max,
  )

  const debouncedSearchTerm = useDebounce(
    searchTerm,
    300,
  )

  useEffect(() => {
    setMinPrice(priceRange.min)
    setMaxPrice(priceRange.max)
  }, [priceRange.min, priceRange.max])

  const categories = useMemo(() => {
    return [
      ...new Set(
        products.map(
          (product) => product.category,
        ),
      ),
    ].sort()
  }, [products])

  const filteredProducts = useMemo(() => {
    const normalizedSearch =
      debouncedSearchTerm.trim().toLowerCase()

    const filtered = products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.title
          .toLowerCase()
          .includes(normalizedSearch)

      const matchesCategory =
        !category ||
        product.category === category

      const matchesMinPrice =
        product.price >= minPrice

      const matchesMaxPrice =
        product.price <= maxPrice

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice
      )
    })

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price

        case 'price-desc':
          return b.price - a.price

        case 'rating-desc':
          return b.rating - a.rating

        case 'name-asc':
          return a.title.localeCompare(b.title)

        case 'name-desc':
          return b.title.localeCompare(a.title)

        case 'default':
        default:
          return 0
      }
    })
  }, [
    products,
    debouncedSearchTerm,
    category,
    minPrice,
    maxPrice,
    sortBy,
  ])

  const clearFilters = () => {
    setSearchTerm('')
    setCategory('')
    setMinPrice(priceRange.min)
    setMaxPrice(priceRange.max)
    setSortBy('default')
  }

  return {
    searchTerm,
    category,
    minPrice,
    maxPrice,
    sortBy,
    priceRange,
    filteredProducts,
    categories,
    setSearchTerm,
    setCategory,
    setMinPrice,
    setMaxPrice,
    setSortBy,
    clearFilters,
  }
}