import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const HomePage = () => {
  const { currentUser } = useAuth()
  if (!currentUser) {
    return null
  }
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <h1>
        Hello {currentUser.name} ({currentUser.email})
      </h1>
    </>
  )
}

export default HomePage
