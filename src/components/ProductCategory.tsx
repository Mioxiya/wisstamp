import Link from "next/link"
import { Product } from "@/types/product"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative aspect-square bg-muted/40">
        <img src={product.images[0]} alt={product.name} className="h-full w-full object-contain" />
      </div>
      <CardContent className="space-y-4 p-4">
        <h3 className="line-clamp-2 text-sm font-medium md:text-base">{product.name}</h3>
        <div className="flex items-end justify-between gap-3">
          <p className="text-lg font-bold text-primary">{product.frontPrice}</p>
          <Link href={`/product/${product.id}`}>
            <Button size="sm">立即定制</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

interface ProductCategoryProps {
  categoryName: string
  viewAllLink: string
  products: Product[]
}

export const ProductCategory = ({ categoryName, viewAllLink, products }: ProductCategoryProps) => {
  return (
    <section className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{categoryName}</h2>
        <Link href={viewAllLink} className="text-sm text-primary hover:underline">
          查看全部
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

