import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const HomePage = () => {
  const { currentUser, logIn, isAuthenticated } = useAuth()
  if (!isAuthenticated || !currentUser) {
    return (
      <main className="flex flex-col items-center justify-center gap-4 text-center">
        <MetaTags title="Home" description="Home page" />
        <h1 className="text-2xl font-bold">Log in to start competing</h1>
        <button className="btn btn-primary" onClick={() => logIn()}>
          Log in
        </button>
      </main>
    )
  }
  const isGolfer = currentUser.roles.includes('golfer')
  navigate(isGolfer ? routes.leagues() : routes.connect())
  return null
}

export default HomePage
