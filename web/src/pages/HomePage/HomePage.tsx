import { SplashPage } from '@redwoodjs/router/dist/splash-page'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <SplashPage hasGeneratedRoutes={false} allStandardRoutes={{}} />
    </>
  )
}

export default HomePage
