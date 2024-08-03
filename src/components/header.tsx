import { UserButton } from './user-button'

export function Header() {
  return (
    <header className="sticky flex justify-center border-b">
      <div className="mx-auto flex h-12 w-full items-center justify-between px-4 sm:px-6">
        <div />
        <UserButton />
      </div>
    </header>
  )
}
