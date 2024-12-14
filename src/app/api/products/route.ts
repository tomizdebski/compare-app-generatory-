import { NextRequest, NextResponse } from 'next/server'
import prisma  from '@/app/lib/prisma'

export async function GET() {
  const products = await prisma.product.findMany()
  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const { name, price, source } = data

  if (!name || !price || !source) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const newProduct = await prisma.product.create({
    data: { name, price: parseFloat(price), source },
  })

  return NextResponse.json(newProduct, { status: 201 })
}
