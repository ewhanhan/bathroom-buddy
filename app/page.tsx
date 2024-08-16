import { SessionProvider } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { auth } from 'auth'
import { FullPageLoadingSpinner } from '@/components/loading-spinner'

const DynamicClientMap = dynamic(
  () => import('../components/client-map').then(mod => mod.ClientMap),
  {
    loading: () => (
      <FullPageLoadingSpinner />
    ),
  },
)

const DynamicReviewDialog = dynamic(
  () => import('../components/review-dialog').then(mod => mod.ReviewDialog),
  {
    loading: () => (
      <FullPageLoadingSpinner />
    ),
  },
)

export default async function Index() {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <DynamicClientMap />
      <DynamicReviewDialog />
    </SessionProvider>
  )
}
