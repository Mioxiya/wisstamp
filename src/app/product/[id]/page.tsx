"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { getProductById } from "@/data/mock-products"

export default function ProductDetail() {
  const params = useParams<{ id: string }>()
  const product = useMemo(() => getProductById(params.id), [params.id])
  const [selectedCombination, setSelectedCombination] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!product) return

    const defaults = Object.entries(product.attributes).reduce<Record<string, string>>((acc, [key, values]) => {
      acc[key] = values[0]
      return acc
    }, {})
    setSelectedCombination(defaults)
  }, [product])

  const currentVariant = product?.variants.find((variant) =>
    Object.entries(variant.combination).every(([key, value]) => selectedCombination[key] === value)
  )

  if (!product) return <div className="p-6 text-center">商品不存在</div>

  return (
    <div className="mx-auto min-h-screen max-w-6xl p-4">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="space-y-4 p-4">
            <div className="aspect-square rounded-lg bg-muted p-4">
              <img
                src={currentVariant?.images[0] || product.images[0]}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-medium">当前配置:</span>
              {Object.entries(selectedCombination).map(([key, value]) => (
                <Badge key={key} variant="secondary">
                  {key}: {value}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <section className="space-y-6">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-sm text-muted-foreground">{product.description}</p>

          {Object.entries(product.attributes).map(([attributeName, options]) => (
            <div key={attributeName} className="space-y-2">
              <h3 className="font-medium">选择 {attributeName}</h3>
              <div className="flex flex-wrap gap-2">
                {options.map((value) => {
                  const active = selectedCombination[attributeName] === value
                  return (
                    <Button
                      key={value}
                      size="sm"
                      variant={active ? "default" : "outline"}
                      className={cn("h-9", active && "shadow-sm")}
                      onClick={() =>
                        setSelectedCombination((prev) => ({
                          ...prev,
                          [attributeName]: value,
                        }))
                      }
                    >
                      {value}
                    </Button>
                  )
                })}
              </div>
            </div>
          ))}

          <div className="text-3xl font-bold text-primary">{currentVariant?.frontPrice || product.frontPrice}</div>

          <Link href={currentVariant?.urlto || product.urlto}>
            <Button className="w-full">立即定制</Button>
          </Link>
        </section>
      </div>

      <div className="mt-8 space-y-4">
        {(currentVariant?.longImages || product.longImages).map((url) => (
          <img className="mx-auto" alt="详情图" key={url} src={url} />
        ))}
      </div>
    </div>
  )
}
