import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'
import { z } from 'zod'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const bodySchema = z.object({
  idToken: z.string(),
  phone: z.string().optional(),
})

interface GoogleTokenPayload {
  email: string
  name: string
  picture: string
  sub: string
  email_verified: boolean
}

export async function POST(request: NextRequest) {
  try {
    const json = await request.json()
    const { idToken, phone } = bodySchema.parse(json)

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload() as GoogleTokenPayload

    if (!payload || !payload.email_verified) {
      return NextResponse.json(
        { error: 'Invalid or unverified Google token' },
        { status: 401 }
      )
    }

    // Se quiser salvar/atualizar o user no banco com Prisma, pode fazer aqui:
    // await prisma.user.upsert({ ... })

    const jwtPayload = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      phone: phone ?? null,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h
    }

    const token = jwt.sign(jwtPayload, process.env.MY_APP_JWT_SECRET!, {
      algorithm: 'HS256',
    })

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        phone: phone ?? null,
      },
    })
  } catch (error) {
    console.error('Mobile auth error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    )
  }
}
