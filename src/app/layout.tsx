import type {Metadata} from "next"
import {Geist, Geist_Mono} from "next/font/google"
import Link from "next/link"
import "./globals.css"
import SearchInput from "@/components/SearchInput"
import {Separator} from "@/components/ui/separator"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "绘物成器",
  description: "Wisstamp custom products",
}

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
    <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
    <div className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          绘物成器
        </Link>
        <SearchInput/>
      </header>
      <nav className="mx-auto flex w-full max-w-7xl items-center gap-6 px-4 pb-3 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">首页</Link>
        <Link href="/categories" className="hover:text-foreground">全部分类</Link>
        <Link href="/ai-generate" className="hover:text-foreground">AI 生图</Link>
        <Link href="/image-composer" className="hover:text-foreground">产品预览</Link>
      </nav>
    </div>

    <main className="mx-auto w-full max-w-2560">{children}</main>

    <footer className="mt-12 border-t bg-muted/20">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 text-sm md:grid-cols-3">
        <div>
          <h3 className="mb-2 font-semibold">绘物成器</h3>
          <p className="text-muted-foreground">Providing reliable tech since 2026</p>
          <div className="footer">
            <p>
              <a target="_blank" href=" ">
                浙ICP备2026006425号-1
              </a>
            </p>
            <p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              < img width="16px" src="https://beian.mps.gov.cn/web/assets/logo01.6189a29f.png" alt=""/>
              <a href="https://beian.mps.gov.cn/#/query/webSearch?code=33070302100832"
                 rel="noreferrer" target="_blank">
                浙公网安备33070302100832号
              </a>
            </p>
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-semibold">服务</h3>
          <div className="space-y-1 text-muted-foreground">
            <p>Branding</p>
            <p>Design</p>
            <p>Marketing</p>
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-semibold">法律</h3>
          <div className="space-y-1 text-muted-foreground">
            <p>Terms of use</p>
            <p>Privacy policy</p>
          </div>
        </div>
      </div>
      <Separator/>
      <p className="py-4 text-center text-xs text-muted-foreground">? 2026 ACME Industries Ltd.</p>
    </footer>
    </body>
    </html>
  )
}

