"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

interface ImageSize {
  width: number
  height: number
}

interface Image {
  imageUrl: string
}

interface StatusBody {
  images: Image[]
  percentCompleted: number
}

function makePreview(prompt: string, index: number) {
  const hue = (index * 45 + prompt.length * 7) % 360
  const safePrompt = prompt.replace(/[<>&"']/g, "")
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1024' height='1024'>
  <defs>
    <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
      <stop offset='0%' stop-color='hsl(${hue} 78% 55%)'/>
      <stop offset='100%' stop-color='hsl(${(hue + 90) % 360} 78% 40%)'/>
    </linearGradient>
  </defs>
  <rect width='100%' height='100%' fill='url(#g)'/>
  <rect x='56' y='56' width='912' height='912' rx='28' fill='rgba(255,255,255,.16)'/>
  <text x='512' y='470' text-anchor='middle' fill='white' font-size='42' font-family='Arial'>AI Mock ${index + 1}</text>
  <text x='512' y='540' text-anchor='middle' fill='white' font-size='26' font-family='Arial'>${safePrompt.slice(0, 26)}</text>
</svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const handleDownload = (url: string, filename: string) => {
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export default function GeneratePage() {
  const [formData, setFormData] = useState({
    imageSize: { width: 512, height: 512 } as ImageSize,
    prompt: "",
    steps: 30,
  })

  const [result, setResult] = useState<StatusBody>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const progress = useMemo(() => (result ? Math.round(result.percentCompleted * 100) : 0), [result])

  const handleGenerate = async () => {
    try {
      setError("")

      if (!formData.prompt.trim()) {
        throw new Error("请输入提示词")
      }
      if (formData.steps < 10 || formData.steps > 50) {
        throw new Error("采样步数应在 10-50 之间")
      }

      setLoading(true)
      setResult({ images: [], percentCompleted: 0 })

      for (let i = 1; i <= 10; i++) {
        await new Promise((resolve) => setTimeout(resolve, 120))
        setResult({ images: [], percentCompleted: i / 10 })
      }

      const images = [0, 1, 2, 3].map((index) => ({ imageUrl: makePreview(formData.prompt, index) }))
      setResult({ images, percentCompleted: 1 })
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setError(err.message || "生成失败")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto my-6 min-h-screen max-w-3xl p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">AI 图片生成（本地演示）</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>请求失败</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>宽度</Label>
              <Input
                type="number"
                value={formData.imageSize.width}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    imageSize: { ...prev.imageSize, width: +e.target.value },
                  }))
                }
                min="256"
                max="2048"
              />
            </div>
            <div className="space-y-2">
              <Label>高度</Label>
              <Input
                type="number"
                value={formData.imageSize.height}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    imageSize: { ...prev.imageSize, height: +e.target.value },
                  }))
                }
                min="256"
                max="2048"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>提示词 *</Label>
            <Textarea
              className="min-h-32"
              placeholder="详细描述希望生成的画面..."
              value={formData.prompt}
              onChange={(e) => setFormData((prev) => ({ ...prev, prompt: e.target.value }))}
            />
          </div>

          <div className="space-y-4 rounded-lg border p-4">
            <h2 className="text-lg font-medium">高级设置</h2>
            <div className="space-y-2">
              <Label>采样步数 ({formData.steps})</Label>
              <Input
                type="range"
                min="10"
                max="50"
                value={formData.steps}
                onChange={(e) => setFormData((prev) => ({ ...prev, steps: +e.target.value }))}
              />
            </div>
          </div>

          <Button className="w-full" onClick={handleGenerate} disabled={loading}>
            {loading ? "生成中..." : "开始生成"}
          </Button>

          {result && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>生成进度</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          {result && result.images?.length > 0 && (
            <section className="mt-8">
              <h2 className="mb-4 text-xl font-bold">生成结果</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {result.images.map((image, index) => (
                  <Card key={index} className="overflow-hidden">
                    <img src={image.imageUrl} alt={`生成结果 ${index + 1}`} className="h-64 w-full object-cover" />
                    <CardContent className="p-4">
                      <Button size="sm" onClick={() => handleDownload(image.imageUrl, `ai_mock_${index + 1}.svg`)}>
                        下载
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
