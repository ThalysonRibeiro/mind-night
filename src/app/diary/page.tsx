"use client"

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut, User, Mail, Shield } from 'lucide-react'
import { Spinner } from '@/components/ui/kibo-ui/spinner'

export default function Diary() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Spinner className="text-indigo-500" size={100} variant='infinite' />
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <div className="min-h-screen">
      <header className="border-b shadow-sm">
        <div className="max-w-7xl mx-">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Bem-vindo de volta,, {session.user?.name?.split(' ')[0]}!
            </h2>
            <p className="text-gray-600">
              Você foi autenticado com sucesso. Aqui estão as informações da sua conta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <span>Profile Information</span>
                </CardTitle>
                <CardDescription>
                  Your Google account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={session.user?.image || ''} alt="Profile" />
                    <AvatarFallback className="text-blue-600 text-lg font-semibold">
                      {session.user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {session.user?.name}
                    </h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>{session.user?.email}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>Session Status</span>
                </CardTitle>
                <CardDescription>
                  Current authentication status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <span className="text-green-800 font-medium">Status</span>
                  <span className="px-3 py-1 text-green-800 rounded-full text-sm font-medium">
                    Authenticated
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Provider:</span>
                    <span className="font-medium">Google OAuth</span>
                  </div>
                  <div className="flex justify-between">
                    <span>User ID:</span>
                    <span className="font-medium font-mono text-xs">
                      {session.user?.id || 'N/A'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Mobile API Integration</CardTitle>
              <CardDescription>
                For mobile app integration, use the following endpoint to authenticate with Google ID tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-700 mb-2">POST /api/mobile-auth</div>
                <div className="text-gray-600">
                  {'{'}
                  <br />
                  idToken: your_google_id_token_here
                  <br />
                  {'}'}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}