import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'

export async function GET(
  request: Request, 
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
  })

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }

  return NextResponse.json(product)
}

export async function PUT(
  request: Request, 
  { params }: { params: { id: string } }
) {
  const id = Number(params.id)
  const data = await request.json()
  
  const updated = await prisma.product.update({
    where: { id },
    data,
  })

  return NextResponse.json(updated)
}

export async function DELETE(
  request: Request, 
  { params }: { params: { id: string } }
) {
  const id = Number(params.id)
  const deleted = await prisma.product.delete({
    where: { id },
  })
  
  return NextResponse.json(deleted)
}
