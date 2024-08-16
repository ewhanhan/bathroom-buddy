import { signIn, signOut } from 'auth'
import { Button } from '@/components/ui/button'

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        'use server'
        await signIn(provider)
      }}
    >
      <Button
        aria-label="Sign into your account"
        {...props}
      >
        Sign In
      </Button>
    </form>
  )
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
      className="w-full"
    >
      <Button
        aria-label="Sign out of your account"
        variant="ghost"
        className="w-full p-0"
        {...props}
      >
        Sign Out
      </Button>
    </form>
  )
}
