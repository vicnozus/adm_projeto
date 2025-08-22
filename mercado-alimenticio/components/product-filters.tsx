"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Filter, X } from "lucide-react"
import type { Product } from "@/types/product"

interface ProductFiltersProps {
  products: Product[]
  onFiltersChange: (filters: any) => void
  category?: string
}

export default function ProductFilters({ products, onFiltersChange, category }: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [onSaleOnly, setOnSaleOnly] = useState(false)
  const [minRating, setMinRating] = useState(0)

  // Extrair dados únicos dos produtos
  const brands = Array.from(new Set(products.map((p) => p.brand))).sort()
  const subcategories = Array.from(new Set(products.map((p) => p.subcategory).filter(Boolean))).sort()
  const maxPrice = Math.max(...products.map((p) => p.price))

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked ? [...selectedBrands, brand] : selectedBrands.filter((b) => b !== brand)
    setSelectedBrands(newBrands)
    updateFilters({ brands: newBrands })
  }

  const handleSubcategoryChange = (subcategory: string, checked: boolean) => {
    const newSubcategories = checked
      ? [...selectedSubcategories, subcategory]
      : selectedSubcategories.filter((s) => s !== subcategory)
    setSelectedSubcategories(newSubcategories)
    updateFilters({ subcategories: newSubcategories })
  }

  const updateFilters = (newFilters: any = {}) => {
    const filters = {
      priceRange: priceRange[1] < maxPrice ? priceRange : undefined,
      brands: selectedBrands.length > 0 ? selectedBrands : undefined,
      subcategories: selectedSubcategories.length > 0 ? selectedSubcategories : undefined,
      inStock: inStockOnly || undefined,
      onSale: onSaleOnly || undefined,
      rating: minRating > 0 ? minRating : undefined,
      ...newFilters,
    }
    onFiltersChange(filters)
  }

  const clearFilters = () => {
    setPriceRange([0, maxPrice])
    setSelectedBrands([])
    setSelectedSubcategories([])
    setInStockOnly(false)
    setOnSaleOnly(false)
    setMinRating(0)
    onFiltersChange({})
  }

  const hasActiveFilters =
    priceRange[1] < maxPrice ||
    selectedBrands.length > 0 ||
    selectedSubcategories.length > 0 ||
    inStockOnly ||
    onSaleOnly ||
    minRating > 0

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="w-full">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
          {hasActiveFilters && <span className="ml-2 wine-primary w-2 h-2 rounded-full"></span>}
        </Button>
      </div>

      {/* Filters Panel */}
      <div className={`${isOpen ? "block" : "hidden"} md:block`}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Filtros</CardTitle>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="w-4 h-4 mr-1" />
                Limpar
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Price Range */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Faixa de Preço</Label>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={(value) => {
                    setPriceRange(value as [number, number])
                    updateFilters({ priceRange: value })
                  }}
                  max={maxPrice}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>R$ {priceRange[0]}</span>
                  <span>R$ {priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Brands */}
            {brands.length > 0 && (
              <div>
                <Label className="text-sm font-semibold mb-3 block">Marcas</Label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                      />
                      <Label htmlFor={`brand-${brand}`} className="text-sm">
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Subcategories */}
            {subcategories.length > 0 && (
              <div>
                <Label className="text-sm font-semibold mb-3 block">Subcategorias</Label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {subcategories.map((subcategory) => (
                    <div key={subcategory} className="flex items-center space-x-2">
                      <Checkbox
                        id={`sub-${subcategory}`}
                        checked={selectedSubcategories.includes(subcategory)}
                        onCheckedChange={(checked) => handleSubcategoryChange(subcategory, checked as boolean)}
                      />
                      <Label htmlFor={`sub-${subcategory}`} className="text-sm">
                        {subcategory}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Disponibilidade</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="in-stock"
                    checked={inStockOnly}
                    onCheckedChange={(checked) => {
                      setInStockOnly(checked as boolean)
                      updateFilters({ inStock: checked })
                    }}
                  />
                  <Label htmlFor="in-stock" className="text-sm">
                    Apenas em estoque
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="on-sale"
                    checked={onSaleOnly}
                    onCheckedChange={(checked) => {
                      setOnSaleOnly(checked as boolean)
                      updateFilters({ onSale: checked })
                    }}
                  />
                  <Label htmlFor="on-sale" className="text-sm">
                    Apenas em promoção
                  </Label>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Avaliação Mínima</Label>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={minRating === rating}
                      onCheckedChange={(checked) => {
                        const newRating = checked ? rating : 0
                        setMinRating(newRating)
                        updateFilters({ rating: newRating })
                      }}
                    />
                    <Label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                      {rating}+ estrelas
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
