"use client"

import { Suspense, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/ProductCategory"
import { searchProducts } from "@/data/mock-products"

export const dynamic = "force-dynamic"

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const results = useMemo(() => searchProducts(query), [query])

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          搜索结果: <span className="text-primary">{query}</span>
        </h1>
        <p className="mt-2 text-muted-foreground">找到 {results.length} 个相关商品</p>
      </div>

      {results.length === 0 && query && (
        <div className="flex h-96 flex-col items-center justify-center text-center">
          <h2 className="text-xl font-semibold">没有找到相关商品</h2>
          <p className="mt-2 text-muted-foreground">尝试调整关键词或使用更通用的搜索词</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="py-8 text-center">正在加载搜索功能...</div>}>
      <SearchContent />
    </Suspense>
  )
}
