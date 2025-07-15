import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

interface GoogleTokenPayload {
  email: string
  name: string
  picture: string
  sub: string
  email_verified: boolean
}

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json()

    if (!idToken) {
      return NextResponse.json(
        { error: 'ID token is required' },
        { status: 400 }
      )
    }

    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload() as GoogleTokenPayload

    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    if (!payload.email_verified) {
      return NextResponse.json(
        { error: 'Email not verified' },
        { status: 401 }
      )
    }

    // Create custom JWT payload
    const jwtPayload = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
    }

    // Sign custom JWT
    const customToken = jwt.sign(
      jwtPayload,
      process.env.MY_APP_JWT_SECRET!,
      { algorithm: 'HS256' }
    )

    return NextResponse.json({
      success: true,
      token: customToken,
      user: {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      },
    })
  } catch (error) {
    console.error('Mobile auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    )
  }
}