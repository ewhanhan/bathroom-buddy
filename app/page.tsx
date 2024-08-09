import { SessionProvider } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { auth } from 'auth'
import { FullPageLoadingSpinner } from '@/components/loading-spinner'
import { ReviewDialog } from '@/components/review-dialog'

const DynamicClientMap = dynamic(() => import('../components/client-provider').then(mod => mod.ClientProvider), {
  loading: () => (
    <FullPageLoadingSpinner />
  ),
})

export default async function Index() {
  const session = await auth()

  return (
    <>
      <SessionProvider session={session}>
        <DynamicClientMap />
      </SessionProvider>
      <ReviewDialog session={session} />
    </>
  )
}
