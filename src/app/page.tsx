import { SessionProvider } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { auth } from '@/lib/auth'
import { FullPageLoadingSpinner } from '@/components/loading-spinner'

const DynamicClientMap = dynamic(() => import('@/components/client-map').then(mod => mod.ClientMap), {
  loading: () => (
    <FullPageLoadingSpinner />
  ),
})

export default async function Index() {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <DynamicClientMap />
    </SessionProvider>
  )
}
