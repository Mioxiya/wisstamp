import { Product } from "@/types/product"

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

function makeVariants(
  productId: string,
  image: string,
  longImages: string[],
  specA: { label: string; values: string[] },
  specB: { label: string; values: string[] },
  basePrice: number,
  step = 10,
) {
  const variants: ProductDetail["variants"] = []

  specA.values.forEach((firstValue, firstIndex) => {
    specB.values.forEach((secondValue, secondIndex) => {
      variants.push({
        combination: {
          [specA.label]: firstValue,
          [specB.label]: secondValue,
        },
        frontPrice: `¥${(basePrice + firstIndex * step + (secondIndex * step) / 2).toFixed(0)}`,
        images: [image],
        longImages,
        urlto: `/order/${productId}?${encodeURIComponent(specA.label)}=${encodeURIComponent(firstValue)}&${encodeURIComponent(specB.label)}=${encodeURIComponent(secondValue)}`,
      })
    })
  })

  return variants
}

function createProduct(
  id: string,
  name: string,
  price: string,
  image: string,
  categoryId: string,
  categoryName: string,
  description: string,
  attributes: Record<string, string[]>,
): ProductDetail {
  const attributeEntries = Object.entries(attributes)
  const [firstSpec, secondSpec] = attributeEntries
  const numericPrice = Number(price.replace(/[^\d.]/g, ""))

  return {
    id,
    name,
    frontPrice: price,
    images: [image],
    categoryId,
    categoryName,
    description,
    longImages: [image],
    urlto: `/order/${id}`,
    attributes,
    variants:
      firstSpec && secondSpec
        ? makeVariants(
            id,
            image,
            [image],
            { label: firstSpec[0], values: firstSpec[1] },
            { label: secondSpec[0], values: secondSpec[1] },
            numericPrice,
          )
        : [],
  }
}

export const mockProductDetails: ProductDetail[] = [
  createProduct(
    "p-001",
    "十二生肖抱枕",
    "¥59",
    "/webimg/12生肖抱枕1.png",
    "home-textile",
    "家居布艺",
    "柔软亲肤的生肖主题抱枕，适合文创礼赠与空间陈列。",
    {
      规格: ["单面印花", "双面印花"],
      尺寸: ["45x45cm", "50x50cm"],
    },
  ),
  createProduct(
    "p-002",
    "冬至礼盒",
    "¥129",
    "/webimg/冬至礼盒1.png",
    "festival-gift",
    "节庆礼盒",
    "围绕节气主题设计的礼盒套装，适合企业伴手礼和节日活动。",
    {
      配置: ["标准款", "升级款"],
      包装: ["天地盖盒", "手提礼盒"],
    },
  ),
  createProduct(
    "p-003",
    "文创包袋",
    "¥49",
    "/webimg/包袋.png",
    "bag-travel",
    "包袋出行",
    "实用与展示兼顾的文创包袋，适合展会、活动和零售陈列。",
    {
      材质: ["帆布", "复合面料"],
      规格: ["中号", "大号"],
    },
  ),
  createProduct(
    "p-004",
    "十二生肖摆件",
    "¥79",
    "/webimg/十二生肖2.png",
    "festival-gift",
    "节庆礼盒",
    "系列化生肖主题摆件，适合新年礼赠与节庆陈设。",
    {
      工艺: ["彩绘", "烫金"],
      套装: ["单款", "礼盒款"],
    },
  ),
  createProduct(
    "p-005",
    "古诗丝巾",
    "¥69",
    "/webimg/古诗丝巾2.png",
    "wearable-accessories",
    "文创配饰",
    "将诗词元素融入织物设计，适合博物馆文创和品牌联名。",
    {
      面料: ["仿真丝", "桑蚕丝"],
      尺寸: ["小方巾", "大方巾"],
    },
  ),
  createProduct(
    "p-006",
    "古诗书签",
    "¥19",
    "/webimg/古诗书签1.png",
    "wearable-accessories",
    "文创配饰",
    "古典气质书签，适合阅读赠品、课程活动和文旅零售。",
    {
      材质: ["铜版纸", "金属蚀刻"],
      包装: ["单张", "礼盒装"],
    },
  ),
  createProduct(
    "p-007",
    "帆布袋",
    "¥39",
    "/webimg/帆布袋.png",
    "bag-travel",
    "包袋出行",
    "大容量帆布袋，适合品牌周边、通勤和展会派发。",
    {
      克重: ["12安", "16安"],
      颜色: ["原色", "米白"],
    },
  ),
  createProduct(
    "p-008",
    "江苏特色油纸伞",
    "¥99",
    "/webimg/江苏特色油纸伞1.png",
    "festival-gift",
    "节庆礼盒",
    "地域文化特色鲜明，适合景区文创与节庆陈列使用。",
    {
      尺寸: ["常规款", "展示款"],
      工艺: ["手绘", "印花"],
    },
  ),
  createProduct(
    "p-009",
    "花卉门帘",
    "¥89",
    "/webimg/花卉门帘1.png",
    "home-textile",
    "家居布艺",
    "花卉图案门帘，适合空间软装、节日布置和活动场景搭建。",
    {
      材质: ["棉麻", "涤纶"],
      尺寸: ["标准款", "加长款"],
    },
  ),
  createProduct(
    "p-010",
    "花卉香囊",
    "¥29",
    "/webimg/花卉香囊1.png",
    "wearable-accessories",
    "文创配饰",
    "轻巧雅致的花卉香囊，适合礼赠、活动周边与节日售卖。",
    {
      香型: ["艾草", "桂花"],
      规格: ["单个", "双只装"],
    },
  ),
  createProduct(
    "p-011",
    "西湖断桥徽章",
    "¥25",
    "/webimg/西湖断桥徽章1.png",
    "wearable-accessories",
    "文创配饰",
    "以地标景观为主题的纪念徽章，适合景区周边和活动纪念。",
    {
      工艺: ["烤漆", "滴胶"],
      包装: ["裸装", "卡纸装"],
    },
  ),
  createProduct(
    "p-012",
    "文创鱼竿套装",
    "¥159",
    "/webimg/鱼竿.png",
    "bag-travel",
    "包袋出行",
    "兼顾实用与文化设计表达的主题鱼竿套装，适合特色礼品开发。",
    {
      长度: ["2.1m", "2.7m"],
      套装: ["基础版", "豪华版"],
    },
  ),
]

export const mockCategories: ProductCategoryData[] = [
  { id: "festival-gift", name: "节庆礼盒", products: mockProductDetails.filter((p) => p.categoryId === "festival-gift") },
  { id: "wearable-accessories", name: "文创配饰", products: mockProductDetails.filter((p) => p.categoryId === "wearable-accessories") },
  { id: "home-textile", name: "家居布艺", products: mockProductDetails.filter((p) => p.categoryId === "home-textile") },
  { id: "bag-travel", name: "包袋出行", products: mockProductDetails.filter((p) => p.categoryId === "bag-travel") },
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
