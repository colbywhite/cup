import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const HomePage = () => {
  const { userMetadata } = useAuth()
  if (!userMetadata) {
    return null
  }
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <h1>Hello {userMetadata.fullName}</h1>
    </>
  )
}

export default HomePage
