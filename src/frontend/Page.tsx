import { useState } from 'react'
import {
  useUser,
  useOrganization,
  SignedIn,
  OrganizationSwitcher,
  UserButton,
  SignedOut,
  SignInButton,
} from '@clerk/clerk-react'
import { ProjectSelectionComponent, TasksComponent } from './Todo'

export function Page() {
  const { user, isLoaded: userLoaded } = useUser()
  const { organization } = useOrganization()

  const [_selectedProject, setSelected] = useState<string>()
  const selectedProject = organization ? _selectedProject : ``

  return (
    <>
      <div className="flex gap-5 justify-between px-5 py-2">
        Hello there,{' '}
        <SignedIn>
          {user?.firstName} <span className="grow"></span>
          <OrganizationSwitcher /> <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          Stranger
          <SignInButton>
            <button className="btn btn-primary">Sign in</button>
          </SignInButton>
        </SignedOut>
      </div>
      <main>
        <h1 className="text-[#ef4444] italic text-6xl text-center">todos</h1>
        <div className="w-1/2 min-w-[400px] bg-white border border-solid border-gray-300 rounded-lg m-auto card-shadow ">
          {!userLoaded && (
            <div className="flex">
              <div className="px-3 py-2 text-gray-500">Loading...</div>
            </div>
          )}
          {userLoaded && !user && (
            <div className="flex">
              <div className="px-3 py-2 text-gray-500">
                Please{' '}
                <SignInButton>
                  <button className="underline">sign in</button>
                </SignInButton>{' '}
                to continue
              </div>
            </div>
          )}
          {userLoaded && user && (
            <>
              {organization && (
                <ProjectSelectionComponent
                  org={organization}
                  selectedProject={selectedProject}
                  setSelected={setSelected}
                />
              )}
              {organization && !selectedProject ? null : (
                <TasksComponent
                  selectedProject={selectedProject}
                  userId={user.id}
                />
              )}
            </>
          )}
        </div>
      </main>
    </>
  )
}
