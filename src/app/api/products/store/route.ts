import { NextRequest, NextResponse } from 'next/server'
import prisma  from '@/app/lib/prisma'

export async function POST(req: NextRequest) {
  const data = await req.json()

  if (!Array.isArray(data)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  // Sprawdzenie poprawności danych
  const productsToCreate = data.filter((p) => p.name && p.price && p.source)

  if (productsToCreate.length === 0) {
    return NextResponse.json({ error: 'No valid products in payload' }, { status: 400 })
  }

  // createMany jeśli chcesz zapisać kilka naraz
  const created = await prisma.product.createMany({
    data: productsToCreate.map(p => ({
      name: p.name,
      price: parseFloat(p.price),
      source: p.source,
    })),
  })

  return NextResponse.json({ message: 'Products stored', count: created.count })
}
