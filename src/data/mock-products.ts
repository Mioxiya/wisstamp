import {Product} from "@/types/product"

export interface ProductDetail extends Product {
  categoryId: string
  categoryName: string
  description: string
  longImages: string[]
  urlto: string
  attributes: Record<string, string[]>
  variants: Array<{
    combination: Record<string, string>
    frontPrice: string
    images: string[]
    longImages: string[]
    urlto: string
  }>
}

export interface ProductCategoryData {
  id: string
  name: string
  products: Product[]
}

const bannerSet = ["/banner/banner01.png", "/banner/banner02.png", "/banner/banner03.png"]

function makeVariants(basePrice: number, image: string, productId: string, longImages: string[]) {
  const sizes = ["5cm", "7cm"]
  const crafts = ["亮面", "磨砂"]
  const variants: ProductDetail["variants"] = []

  sizes.forEach((size, sizeIndex) => {
    crafts.forEach((craft, craftIndex) => {
      const add = sizeIndex * 6 + craftIndex * 3
      variants.push({
        combination: {
          尺寸: size,
          工艺: craft,
        },
        frontPrice: `¥${(basePrice + add).toFixed(1)}`,
        images: [image],
        longImages,
        urlto: `/order/${productId}?size=${encodeURIComponent(size)}&craft=${encodeURIComponent(craft)}`,
      })
    })
  })

  return variants
}

export const mockProductDetails: ProductDetail[] = [
  {
    id: "p-001",
    name: "亚克力双层钥匙扣",
    frontPrice: "¥19.9",
    images: ["https://img02.songzhaopian.cn/rz/2025/04/23/admin_1956/4e9a14a1-ed65-4fd2-b7cd-ae80cfbf7542.png?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
    categoryId: "acrylic",
    categoryName: "亚克力定制",
    description: "支持单面/双面印刷，边缘透明抛光，适合应援和周边制作。",
    longImages: ["https://img02.songzhaopian.cn/rz/2025/04/23/admin_1956/4e9a14a1-ed65-4fd2-b7cd-ae80cfbf7542.png?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
    urlto: "/order/p-001",
    attributes: {
      尺寸: ["5cm", "7cm"],
      工艺: ["亮面", "磨砂"],
    },
    variants: makeVariants(19.9, "https://img02.songzhaopian.cn/rz/2025/04/23/admin_1956/4e9a14a1-ed65-4fd2-b7cd-ae80cfbf7542.png?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1", "p-001", ["https://img02.songzhaopian.cn/rz/2025/04/23/admin_1956/4e9a14a1-ed65-4fd2-b7cd-ae80cfbf7542.png?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"]),
  },
  {
    id: "p-002",
    name: "亚克力立牌",
    frontPrice: "¥29.9",
    images: ["https://img02.songzhaopian.cn/rz/2025/07/16/admin_3585/b17f5def-0f70-4aa8-a67f-68ec5d404b8d.jpg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
    categoryId: "acrylic",
    categoryName: "亚克力定制",
    description: "高透板材，UV 彩印，适合桌面陈列与活动周边。",
    longImages: ["https://img02.songzhaopian.cn/rz/2025/07/16/admin_3585/b17f5def-0f70-4aa8-a67f-68ec5d404b8d.jpg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
    urlto: "/order/p-002",
    attributes: {
      尺寸: ["10cm", "15cm"],
      底座: ["透明", "黑色"],
    },
    variants: [
      {
        combination: {尺寸: "10cm", 底座: "透明"},
        frontPrice: "¥29.9",
        images: ["https://img02.songzhaopian.cn/rz/2025/07/16/admin_3585/b17f5def-0f70-4aa8-a67f-68ec5d404b8d.jpg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        longImages: ["https://img02.songzhaopian.cn/rz/2025/07/16/admin_3585/b17f5def-0f70-4aa8-a67f-68ec5d404b8d.jpg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        urlto: "/order/p-002?size=10cm&base=clear",
      },
      {
        combination: {尺寸: "10cm", 底座: "黑色"},
        frontPrice: "¥32.9",
        images: ["https://img02.songzhaopian.cn/rz/2025/07/16/admin_3585/b17f5def-0f70-4aa8-a67f-68ec5d404b8d.jpg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        longImages: ["https://img02.songzhaopian.cn/rz/2025/07/16/admin_3585/b17f5def-0f70-4aa8-a67f-68ec5d404b8d.jpg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        urlto: "/order/p-002?size=10cm&base=black",
      },
      {
        combination: {尺寸: "15cm", 底座: "透明"},
        frontPrice: "¥39.9",
        images: ["https://img02.songzhaopian.cn/rz/2025/07/16/admin_3585/b17f5def-0f70-4aa8-a67f-68ec5d404b8d.jpg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        longImages: ["https://img02.songzhaopian.cn/rz/2025/07/16/admin_3585/b17f5def-0f70-4aa8-a67f-68ec5d404b8d.jpg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        urlto: "/order/p-002?size=15cm&base=clear",
      },
      {
        combination: {尺寸: "15cm", 底座: "黑色"},
        frontPrice: "¥42.9",
        images: ["https://img02.songzhaopian.cn/rz/2025/07/16/admin_3585/b17f5def-0f70-4aa8-a67f-68ec5d404b8d.jpg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        longImages: ["https://img02.songzhaopian.cn/rz/2025/07/16/admin_3585/b17f5def-0f70-4aa8-a67f-68ec5d404b8d.jpg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        urlto: "/order/p-002?size=15cm&base=black",
      },
    ],
  },
  {
    id: "p-003",
    name: "徽章套装（圆形）",
    frontPrice: "¥9.9",
    images: ["https://img02.songzhaopian.cn/rz/2025/04/22/admin_1956/72e222ba-df33-4ff8-9937-dc4cf326ab53.png?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
    categoryId: "badge",
    categoryName: "徽章胸针",
    description: "可做 58mm/75mm，支持覆膜，适合活动礼包。",
    longImages: ["https://img02.songzhaopian.cn/rz/2025/04/22/admin_1956/72e222ba-df33-4ff8-9937-dc4cf326ab53.png?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
    urlto: "/order/p-003",
    attributes: {
      尺寸: ["58mm", "75mm"],
      工艺: ["亮膜", "哑膜"],
    },
    variants: makeVariants(9.9, "https://img02.songzhaopian.cn/rz/2025/04/22/admin_1956/72e222ba-df33-4ff8-9937-dc4cf326ab53.png?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1", "p-003", ["https://img02.songzhaopian.cn/rz/2025/04/22/admin_1956/72e222ba-df33-4ff8-9937-dc4cf326ab53.png?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"]),
  },
  {
    id: "p-004",
    name: "方形徽章",
    frontPrice: "¥11.9",
    images: ["https://img02.songzhaopian.cn/rz/2025/04/23/admin_3585/61fb5758-08ea-4750-ae3e-b874314ad93f.png?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
    categoryId: "badge",
    categoryName: "徽章胸针",
    description: "方形视觉更醒目，适合角色半身图和文案。",
    longImages: ["https://img02.songzhaopian.cn/rz/2025/04/23/admin_3585/61fb5758-08ea-4750-ae3e-b874314ad93f.png?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
    urlto: "/order/p-004",
    attributes: {
      尺寸: ["50mm", "65mm"],
      工艺: ["亮面", "细闪"],
    },
    variants: makeVariants(11.9, "https://img02.songzhaopian.cn/rz/2025/04/23/admin_3585/61fb5758-08ea-4750-ae3e-b874314ad93f.png?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1", "p-004", [bannerSet[0], bannerSet[2]]),
  },
  {
    id: "p-005",
    name: "PET 贴纸包",
    frontPrice: "¥14.9",
    images: ["https://img02.songzhaopian.cn/resource/tbp/2024/11/22/6a05f84b-e66d-43eb-881f-fa20b7c8e132.jpeg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
    categoryId: "sticker",
    categoryName: "贴纸纸品",
    description: "防水耐磨，适合手账、笔记本、电脑壳。",
    longImages: ["https://img02.songzhaopian.cn/resource/tbp/2024/11/22/6a05f84b-e66d-43eb-881f-fa20b7c8e132.jpeg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
    urlto: "/order/p-005",
    attributes: {
      数量: ["20 张", "40 张"],
      刀模: ["异形", "圆角"],
    },
    variants: [
      {
        combination: {数量: "20 张", 刀模: "异形"},
        frontPrice: "¥14.9",
        images: ["https://img02.songzhaopian.cn/resource/tbp/2024/11/22/6a05f84b-e66d-43eb-881f-fa20b7c8e132.jpeg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        longImages: ["https://img02.songzhaopian.cn/resource/tbp/2024/11/22/6a05f84b-e66d-43eb-881f-fa20b7c8e132.jpeg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        urlto: "/order/p-005?count=20&cut=shape",
      },
      {
        combination: {数量: "20 张", 刀模: "圆角"},
        frontPrice: "¥13.9",
        images: ["https://img02.songzhaopian.cn/resource/tbp/2024/11/22/6a05f84b-e66d-43eb-881f-fa20b7c8e132.jpeg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        longImages: ["https://img02.songzhaopian.cn/resource/tbp/2024/11/22/6a05f84b-e66d-43eb-881f-fa20b7c8e132.jpeg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        urlto: "/order/p-005?count=20&cut=round",
      },
      {
        combination: {数量: "40 张", 刀模: "异形"},
        frontPrice: "¥24.9",
        images: ["https://img02.songzhaopian.cn/resource/tbp/2024/11/22/6a05f84b-e66d-43eb-881f-fa20b7c8e132.jpeg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        longImages: ["https://img02.songzhaopian.cn/resource/tbp/2024/11/22/6a05f84b-e66d-43eb-881f-fa20b7c8e132.jpeg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        urlto: "/order/p-005?count=40&cut=shape",
      },
      {
        combination: {数量: "40 张", 刀模: "圆角"},
        frontPrice: "¥23.9",
        images: ["https://img02.songzhaopian.cn/resource/tbp/2024/11/22/6a05f84b-e66d-43eb-881f-fa20b7c8e132.jpeg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        longImages: ["https://img02.songzhaopian.cn/resource/tbp/2024/11/22/6a05f84b-e66d-43eb-881f-fa20b7c8e132.jpeg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        urlto: "/order/p-005?count=40&cut=round",
      },
    ],
  },
  {
    id: "p-006",
    name: "明信片套组",
    frontPrice: "¥12.9",
    images: ["https://img02.songzhaopian.cn/rz/2025/11/04/admin_1956/7fa57b99-d322-441a-857e-916d412001da.jpg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
    categoryId: "sticker",
    categoryName: "贴纸纸品",
    description: "300g 铜版纸，色彩饱满，支持双面设计。",
    longImages: ["https://img02.songzhaopian.cn/rz/2025/11/04/admin_1956/7fa57b99-d322-441a-857e-916d412001da.jpg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
    urlto: "/order/p-006",
    attributes: {
      纸张: ["铜版纸", "珠光纸"],
      数量: ["10 张", "20 张"],
    },
    variants: [
      {
        combination: {纸张: "铜版纸", 数量: "10 张"},
        frontPrice: "¥12.9",
        images: ["https://img02.songzhaopian.cn/rz/2025/11/04/admin_1956/7fa57b99-d322-441a-857e-916d412001da.jpg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        longImages: ["https://img02.songzhaopian.cn/rz/2025/11/04/admin_1956/7fa57b99-d322-441a-857e-916d412001da.jpg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        urlto: "/order/p-006?paper=coat&count=10",
      },
      {
        combination: {纸张: "珠光纸", 数量: "10 张"},
        frontPrice: "¥14.9",
        images: ["https://img02.songzhaopian.cn/rz/2025/11/04/admin_1956/7fa57b99-d322-441a-857e-916d412001da.jpg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        longImages: ["https://img02.songzhaopian.cn/rz/2025/11/04/admin_1956/7fa57b99-d322-441a-857e-916d412001da.jpg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        urlto: "/order/p-006?paper=pearl&count=10",
      },
      {
        combination: {纸张: "铜版纸", 数量: "20 张"},
        frontPrice: "¥21.9",
        images: ["https://img02.songzhaopian.cn/rz/2025/11/04/admin_1956/7fa57b99-d322-441a-857e-916d412001da.jpg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        longImages: ["https://img02.songzhaopian.cn/rz/2025/11/04/admin_1956/7fa57b99-d322-441a-857e-916d412001da.jpg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        urlto: "/order/p-006?paper=coat&count=20",
      },
      {
        combination: {纸张: "珠光纸", 数量: "20 张"},
        frontPrice: "¥24.9",
        images: ["https://img02.songzhaopian.cn/rz/2025/11/04/admin_1956/7fa57b99-d322-441a-857e-916d412001da.jpg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        longImages: ["https://img02.songzhaopian.cn/rz/2025/11/04/admin_1956/7fa57b99-d322-441a-857e-916d412001da.jpg?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
        urlto: "/order/p-006?paper=pearl&count=20",
      },
    ],
  },
  {
    id: "p-007",
    name: "拍立得卡片",
    frontPrice: "¥15.9",
    images: ["https://img02.songzhaopian.cn/rz/2025/05/15/admin_3585/ce1a1cb5-ed1a-49c6-a71b-6e67af7b898c.png?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
    categoryId: "photo",
    categoryName: "照片周边",
    description: "复古边框，适合打卡、应援和赠礼。",
    longImages: ["https://img02.songzhaopian.cn/rz/2025/05/15/admin_3585/ce1a1cb5-ed1a-49c6-a71b-6e67af7b898c.png?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
    urlto: "/order/p-007",
    attributes: {
      尺寸: ["mini", "wide"],
      工艺: ["哑光", "光面"],
    },
    variants: makeVariants(15.9, "https://img02.songzhaopian.cn/rz/2025/05/15/admin_3585/ce1a1cb5-ed1a-49c6-a71b-6e67af7b898c.png?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1", "p-007", ["https://img02.songzhaopian.cn/rz/2025/05/15/admin_3585/ce1a1cb5-ed1a-49c6-a71b-6e67af7b898c.png?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"]),
  },
  {
    id: "p-008",
    name: "照片挂件",
    frontPrice: "¥18.9",
    images: ["https://img02.songzhaopian.cn/rz/2025/11/27/admin_10/5001c7b0-23c4-4840-b474-a8f65e8dccac.png?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
    categoryId: "photo",
    categoryName: "照片周边",
    description: "轻量耐摔，赠送挂链，可选双面图。",
    longImages: ["https://img02.songzhaopian.cn/rz/2025/11/27/admin_10/5001c7b0-23c4-4840-b474-a8f65e8dccac.png?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"],
    urlto: "/order/p-008",
    attributes: {
      尺寸: ["5cm", "7cm"],
      工艺: ["透明", "白边"],
    },
    variants: makeVariants(18.9, "https://img02.songzhaopian.cn/rz/2025/11/27/admin_10/5001c7b0-23c4-4840-b474-a8f65e8dccac.png?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1", "p-008", ["https://img02.songzhaopian.cn/rz/2025/11/27/admin_10/5001c7b0-23c4-4840-b474-a8f65e8dccac.png?x-oss-process=image/auto-orient,1/format,webp/resize,s_600/interlace,1"]),
  },
]

export const mockCategories: ProductCategoryData[] = [
  {id: "acrylic", name: "亚克力定制", products: mockProductDetails.filter((p) => p.categoryId === "acrylic")},
  {id: "badge", name: "徽章胸针", products: mockProductDetails.filter((p) => p.categoryId === "badge")},
  {id: "sticker", name: "贴纸纸品", products: mockProductDetails.filter((p) => p.categoryId === "sticker")},
  {id: "photo", name: "照片周边", products: mockProductDetails.filter((p) => p.categoryId === "photo")},
]

export const getAllCategories = () => mockCategories

export const getAllProducts = () => mockProductDetails

export const getProductById = (id: string) => mockProductDetails.find((item) => item.id === id)

export const searchProducts = (query: string) => {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return []

  return mockProductDetails.filter((item) => {
    const haystack = `${item.name} ${item.categoryName} ${item.description}`.toLowerCase()
    return haystack.includes(normalized)
  })
}

