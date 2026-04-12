"use client"

import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import "swiper/css"
import { ProductCategory } from "@/components/ProductCategory"
import { getAllCategories, getAllProducts } from "@/data/mock-products"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  const categories = getAllCategories()
  const products = getAllProducts()
  const featuredProducts = products.slice(0, 3)
  const newProducts = products.slice(3, 8)

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <Swiper modules={[Navigation, Autoplay]} autoplay={{ delay: 5000 }} className="overflow-hidden rounded-xl">
          {[1].map((item) => (
            <SwiperSlide key={item}>
              <img src="/banner/banner.png" alt="Banner" className="w-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {categories.map((category) => (
        <div className="mx-auto max-w-7xl p-4" key={category.id}>
          <ProductCategory
            categoryName={category.name}
            viewAllLink={`/categories?category=${encodeURIComponent(category.id)}`}
            products={category.products}
          />
        </div>
      ))}

      <section className="mx-auto my-12 max-w-7xl px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">热门定制服务</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden transition-shadow hover:shadow-lg">
              <img src={product.images[0]} alt={product.name} className="h-64 w-full object-cover" />
              <CardContent className="space-y-4 p-5">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">精选本地文创产品，支持主题化定制与礼赠方案</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">{product.frontPrice} 起</span>
                  <Link href={`/product/${product.id}`}>
                    <Button>立即定制</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">新品潮品展示</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            {newProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <img src={product.images[0]} alt={product.name} className="h-48 w-full object-cover" />
                <CardContent className="space-y-3 p-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.frontPrice} 起，支持文创主题延展与批量定制</p>
                  <Link href={`/product/${product.id}`}>
                    <Button size="sm" variant="secondary">查看详情</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 text-center text-primary-foreground">
          <h2 className="mb-4 text-4xl font-bold">开启您的定制之旅</h2>
          <p className="mb-8 text-xl opacity-90">专业供应链服务，快速打样生产</p>
          <Button size="lg" variant="secondary">立即咨询客服</Button>
        </div>
      </section>
    </div>
  )
}
