import { NextRequest, NextResponse } from 'next/server'
import { getAmazonProducts, getEbayProducts } from '@/app/lib/fetchData'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query') || 'smartphone'

  const [amazonData, ebayData] = await Promise.all([
    getAmazonProducts(query),
    getEbayProducts(query),
  ])

  // Połącz dane, opcjonalnie posortuj po cenie:
  const allItems = [...amazonData, ...ebayData].sort((a, b) => (a.price ?? 999999) - (b.price ?? 999999))

  return NextResponse.json(allItems)
}
