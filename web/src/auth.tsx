import { type PropsWithChildren, useEffect } from 'react'

import { ClerkProvider, useUser } from '@clerk/clerk-react'

import { createAuth } from '@redwoodjs/auth-clerk-web'
import { navigate } from '@redwoodjs/router'

import LoadingPage from 'src/components/LoadingPage/LoadingPage'

export const { AuthProvider: ClerkRwAuthProvider, useAuth } = createAuth()

const ClerkStatusUpdater = () => {
  const { isSignedIn, user, isLoaded } = useUser()
  const { reauthenticate } = useAuth()

  useEffect(() => {
    if (isLoaded) {
      reauthenticate()
    }
  }, [isSignedIn, user, reauthenticate, isLoaded])

  return null
}

type ClerkOptions =
  | { publishableKey: string; frontendApi?: never }
  | { publishableKey?: never; frontendApi: string }

const ClerkProviderWrapper = ({
  children,
  clerkOptions,
}: PropsWithChildren & { clerkOptions: ClerkOptions }) => {
  const { reauthenticate, loading } = useAuth()

  return (
    <ClerkProvider
      {...clerkOptions}
      navigate={(to) => reauthenticate().then(() => navigate(to))}
    >
      {loading ? <LoadingPage /> : children}
      <ClerkStatusUpdater />
    </ClerkProvider>
  )
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const publishableKey = process.env.CLERK_PUBLISHABLE_KEY
  const frontendApi =
    process.env.CLERK_FRONTEND_API_URL || process.env.CLERK_FRONTEND_API

  const clerkOptions: ClerkOptions = publishableKey
    ? { publishableKey }
    : { frontendApi }

  return (
    <ClerkRwAuthProvider>
      <ClerkProviderWrapper clerkOptions={clerkOptions}>
        {children}
      </ClerkProviderWrapper>
    </ClerkRwAuthProvider>
  )
}
