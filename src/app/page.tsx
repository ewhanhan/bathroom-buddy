import { SessionProvider } from 'next-auth/react'
import ClientExample from '@/components/client-example'
import { auth } from '@/lib/auth'

export default async function Index() {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <ClientExample />
    </SessionProvider>
  )
}
