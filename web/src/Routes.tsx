import { Router, Route, Set } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import RootLayout from 'src/layouts/RootLayout/RootLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={RootLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
