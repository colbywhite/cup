import { MetaTags } from '@redwoodjs/web'

import { SplashPage } from 'src/components/SplashPage/SplashPage'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <SplashPage hasGeneratedRoutes={false} allStandardRoutes={{}} />
    </>
  )
}

export default HomePage
