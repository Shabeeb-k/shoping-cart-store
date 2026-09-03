import { useEffect, useMemo, useState } from "react";
import type { Product } from "../types/product";
import { useDebounce } from "./useDebounce";

interface UseProductFiltersResult {
  searchTerm: string;
  category: string;
  minPrice: number;
  maxPrice: number;

  priceRange: {
    min: number;
    max: number;
  };

  filteredProducts: Product[];
  categories: string[];

  setSearchTerm: (value: string) => void;
  setCategory: (value: string) => void;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
  clearFilters: () => void;
}

export const useProductFilters = (
  products: Product[],
): UseProductFiltersResult => {
  const priceRange = useMemo(() => {
    if (products.length === 0) {
      return {
        min: 0,
        max: 100,
      };
    }

    const prices = products.map((product) => product.price);

    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [products]);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  const [minPrice, setMinPrice] = useState(priceRange.min);

  const [maxPrice, setMaxPrice] = useState(priceRange.max);

  useEffect(() => {
    setMinPrice(priceRange.min);
    setMaxPrice(priceRange.max);
  }, [priceRange.min, priceRange.max]);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))].sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = debouncedSearchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.title.toLowerCase().includes(normalizedSearch);

      const matchesCategory = !category || product.category === category;

      const matchesMinPrice = product.price >= minPrice;

      const matchesMaxPrice = product.price <= maxPrice;

      return (
        matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice
      );
    });
  }, [products, debouncedSearchTerm, category, minPrice, maxPrice]);

  const clearFilters = () => {
    setSearchTerm("");
    setCategory("");
    setMinPrice(priceRange.min);
    setMaxPrice(priceRange.max);
  };

  return {
    searchTerm,
    category,
    minPrice,
    maxPrice,
    priceRange,
    filteredProducts,
    categories,
    setSearchTerm,
    setCategory,
    setMinPrice,
    setMaxPrice,
    clearFilters,
  };
};
