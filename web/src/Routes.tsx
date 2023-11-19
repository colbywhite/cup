import { Router, Route, Set } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import RootLayout from 'src/layouts/RootLayout/RootLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={RootLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/leagues" page={LeaguesPage} name="leagues" />
        <Route path="/connect" page={ConnectPage} name="connect" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
