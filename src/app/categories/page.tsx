"use client"

import { Suspense } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/ProductCategory"
import { getAllCategories } from "@/data/mock-products"
import { cn } from "@/lib/utils"

function CategoryContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const categories = getAllCategories()
  const allProducts = categories.flatMap((c) => c.products)
  const currentCategory = searchParams.get("category") || "all"

  const list = [{ id: "all", name: "全部商品", products: allProducts }, ...categories]
  const currentProducts = list.find((c) => c.id === currentCategory)?.products || allProducts

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-6">
        <aside className="w-64 space-y-2">
          <h2 className="mb-4 text-lg font-semibold">商品分类</h2>
          {list.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString())
                params.set("category", category.id)
                router.replace(`${pathname}?${params.toString()}`)
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-md px-4 py-2 text-left text-sm transition-colors",
                currentCategory === category.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span>{category.name}</span>
              <span className="text-xs opacity-75">{category.products.length}</span>
            </button>
          ))}
        </aside>

        <section className="flex-1">
          <div className="mb-6 text-sm text-muted-foreground">共 {currentProducts.length} 件商品</div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="py-8 text-center">加载分类数据...</div>}>
      <CategoryContent />
    </Suspense>
  )
}
