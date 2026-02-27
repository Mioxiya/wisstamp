"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import "swiper/css"
import { ProductCategory } from "@/components/ProductCategory"
import { getAllCategories } from "@/data/mock-products"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  const categories = getAllCategories()

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <Swiper modules={[Navigation, Autoplay]} autoplay={{ delay: 5000 }} className="overflow-hidden rounded-xl">
          {[1, 2, 3].map((item) => (
            <SwiperSlide key={item}>
              <img src={`/banner/banner0${item}.png`} alt="Banner" className="w-full object-cover" />
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
          {["马克杯", "亚克力定制", "贴纸套装"].map((service, index) => (
            <Card key={service} className="overflow-hidden transition-shadow hover:shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/img/img${index+1}.png`} alt={service} className="h-64 w-full object-cover" />
              <CardContent className="space-y-4 p-5">
                <h3 className="text-lg font-semibold">{service}</h3>
                <p className="text-sm text-muted-foreground">专业级定制服务，多种工艺可选</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">¥99 起</span>
                  <Button>立即定制</Button>
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
            {[1, 2, 3, 4, 5].map((item) => (
              <Card key={item} className="overflow-hidden">
                <img src={`https://img02.songzhaopian.cn/rz/2024/11/01/admin_3589/95c298c3-c084-464c-a61c-be322fe00cf8.png?x-oss-process=image/auto-orient,1/format,webp/resize,s_750/interlace,1`} alt="样品" className="h-48 w-full object-cover" />
                <CardContent className="space-y-3 p-4">
                  <h3 className="font-semibold">工艺样品包</h3>
                  <p className="text-sm text-muted-foreground">一次性体验多种制作工艺</p>
                  <Button size="sm" variant="secondary">查看详情</Button>
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
