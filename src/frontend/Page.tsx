import Todo from './Todo'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/clerk-react'

export default function Page() {
  const { user } = useUser()

  return (
    <>
      <div className="flex nav">
        Hello there,{' '}
        <SignedIn>
          {user?.firstName} <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          Stranger{' '}
          <SignInButton mode="modal">
            <button className="btn btn-primary">Sign in</button>
          </SignInButton>
        </SignedOut>
      </div>
      <Todo />
    </>
  )
}
