import { SessionProvider } from 'next-auth/react'
import { auth } from '@/lib/auth'
import { ClientMap } from '@/components/client-map'

export default async function Index() {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <ClientMap />
    </SessionProvider>
  )
}
