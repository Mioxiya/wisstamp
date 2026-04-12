'use client'

import { ChangeEvent, PointerEvent, useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const products = [
  { label: '徽章', value: 'badge' },
  { label: '帆布包', value: 'canvasbag' },
  { label: '桌垫', value: 'tablematlarge' },
  { label: '枕头', value: 'bodypillow' },
  { label: 'T 恤', value: 'Tshirtpart' },
] as const

const canvasSize = { width: 400, height: 400 }

export default function ImageComposerPage() {
  const [product, setProduct] = useState<(typeof products)[number]['value']>(products[0].value)
  const [uploaded, setUploaded] = useState<string | null>(null)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: canvasSize.width / 2, y: canvasSize.height / 2 })
  const [uploadImgObj, setUploadImgObj] = useState<HTMLImageElement | null>(null)

  const dragging = useRef(false)
  const last = useRef({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const getImagePath = (type: 'background' | 'highlight' | 'main' | 'shadow') => `/products/${product}/${type}.png`

  const getImageBounds = () => {
    if (!uploadImgObj) {
      return {
        minX: 0,
        maxX: canvasSize.width,
        minY: 0,
        maxY: canvasSize.height,
      }
    }

    const previewWidth = canvasSize.width * scale
    const previewHeight = previewWidth * (uploadImgObj.height / uploadImgObj.width)

    return {
      minX: -previewWidth / 2,
      maxX: canvasSize.width + previewWidth / 2,
      minY: -previewHeight / 2,
      maxY: canvasSize.height + previewHeight / 2,
    }
  }

  const clampPosition = (nextX: number, nextY: number) => {
    const bounds = getImageBounds()
    return {
      x: Math.min(Math.max(nextX, bounds.minX), bounds.maxX),
      y: Math.min(Math.max(nextY, bounds.minY), bounds.maxY),
    }
  }

  const resetComposer = () => {
    setUploaded(null)
    setUploadImgObj(null)
    setScale(1)
    setPosition({ x: canvasSize.width / 2, y: canvasSize.height / 2 })
  }

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setUploaded(result)

      const img = new Image()
      img.onload = () => {
        setUploadImgObj(img)
        setPosition(clampPosition(canvasSize.width / 2, canvasSize.height / 2))
        setScale(1)
      }
      img.src = result
    }
    reader.readAsDataURL(file)
  }

  const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => resolve(img)
      img.onerror = () => resolve(img)
      img.src = src
    })

  const drawCanvas = async () => {
    const canvas = canvasRef.current
    if (!canvas || !uploaded || !uploadImgObj) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const [bg, hl, main, shadow] = await Promise.all([
      loadImage(getImagePath('background')),
      loadImage(getImagePath('highlight')),
      loadImage(getImagePath('main')),
      loadImage(getImagePath('shadow')),
    ])

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

    const upWidth = canvas.width * scale
    const ratio = uploadImgObj.height / uploadImgObj.width
    const upHeight = upWidth * ratio
    const dx = position.x - upWidth / 2
    const dy = position.y - upHeight / 2

    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = canvas.width
    tempCanvas.height = canvas.height

    const tempCtx = tempCanvas.getContext('2d')
    if (!tempCtx) return

    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height)
    tempCtx.drawImage(uploadImgObj, dx, dy, upWidth, upHeight)
    tempCtx.globalCompositeOperation = 'destination-in'
    tempCtx.drawImage(main, 0, 0, canvas.width, canvas.height)

    ctx.drawImage(tempCanvas, 0, 0)
    ctx.drawImage(hl, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(shadow, 0, 0, canvas.width, canvas.height)
  }

  useEffect(() => {
    void drawCanvas()
  }, [uploaded, scale, position, uploadImgObj, product])

  useEffect(() => {
    setPosition((current) => clampPosition(current.x, current.y))
  }, [scale, uploadImgObj])

  const startDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!uploaded) return

    dragging.current = true
    last.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return

    const dx = e.clientX - last.current.x
    const dy = e.clientY - last.current.y

    setPosition((pos) => clampPosition(pos.x + dx, pos.y + dy))

    last.current = { x: e.clientX, y: e.clientY }
  }

  const endDrag = (e?: PointerEvent<HTMLDivElement>) => {
    dragging.current = false
    if (e?.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  const exportImage = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = url
    link.download = `${product}_preview.png`
    link.click()
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b bg-muted/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-medium text-primary">产品预览</p>
            <h1 className="text-4xl font-bold tracking-tight">在线生成商品合成预览图</h1>
            <p className="text-base text-muted-foreground">
              上传设计图后即可快速查看成品效果，适合在下单前做视觉确认和展示沟通。
            </p>
          </div>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <p>1. 选择商品模版</p>
            <p>2. 上传图片并拖拽位置</p>
            <p>3. 调整缩放后导出预览</p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[360px_minmax(0,1fr)]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>编辑面板</CardTitle>
            <CardDescription>使用与站内一致的配置卡片布局来完成商品预览生成。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="product-type">商品种类</Label>
              <select
                id="product-type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={product}
                onChange={(e) => {
                  setProduct(e.target.value as (typeof products)[number]['value'])
                  resetComposer()
                }}
              >
                {products.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="source-image">上传设计图</Label>
              <Input
                id="source-image"
                key={product}
                type="file"
                accept="image/*"
                onChange={handleUpload}
              />
              <p className="text-xs text-muted-foreground">推荐上传透明背景 PNG，合成效果会更稳定。</p>
            </div>

            <div className="space-y-3 rounded-lg border bg-muted/20 p-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="scale-range">缩放</Label>
                <span className="text-sm font-medium">{scale.toFixed(2)}x</span>
              </div>
              <input
                id="scale-range"
                type="range"
                min="0.1"
                max="3"
                step="0.05"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                onInput={(e) => setScale(parseFloat((e.target as HTMLInputElement).value))}
                disabled={!uploaded}
                className="w-full cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.1x</span>
                <span>3.0x</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1" onClick={exportImage} disabled={!uploaded}>
                导出预览图
              </Button>
              <Button variant="secondary" onClick={resetComposer} disabled={!uploaded}>
                重置
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-muted/20">
            <CardTitle>预览画布</CardTitle>
            <CardDescription>上传后可直接在画布内拖动图片位置，实时查看商品成图效果。</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4">
              <div
                className={`relative overflow-hidden rounded-xl border bg-background shadow-sm select-none touch-none ${
                  uploaded ? 'cursor-grab active:cursor-grabbing' : ''
                }`}
                style={{ width: canvasSize.width, height: canvasSize.height }}
                onPointerDown={uploaded ? startDrag : undefined}
                onPointerMove={uploaded ? onDrag : undefined}
                onPointerUp={uploaded ? endDrag : undefined}
                onPointerCancel={uploaded ? endDrag : undefined}
              >
                {uploaded ? (
                  <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} className="block" />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-muted/30 px-6 text-center">
                    <div className="rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                      预览等待中
                    </div>
                    <p className="text-lg font-semibold">上传一张设计图开始合成</p>
                    <p className="max-w-xs text-sm text-muted-foreground">
                      当前会按所选商品模板生成预览，上传后可拖拽调整位置并使用左侧滑块缩放。
                    </p>
                  </div>
                )}
              </div>

              <div className="w-full rounded-lg border bg-muted/20 p-4 text-sm text-muted-foreground">
                当前模板尺寸为 {canvasSize.width} x {canvasSize.height}，适合用于商品效果预览与客户确认。
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
