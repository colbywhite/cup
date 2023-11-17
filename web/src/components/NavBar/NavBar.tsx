import type { SignOutCallback } from '@clerk/types'

import type { CurrentUser } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

function UserMenu({
  user,
  logOut,
}: {
  user: CurrentUser
  logOut: SignOutCallback
}) {
  return (
    <div className="dropdown-end dropdown">
      <button className="avatar btn btn-circle btn-ghost" aria-haspopup>
        <div className="w-10 rounded-full">
          <img src={user.avatar} alt={`${user.name} avatar`} />
        </div>
      </button>
      <ul className="menu dropdown-content menu-xs z-[1] mt-3 bg-neutral p-2 text-neutral-content shadow">
        <li>
          <button className="btn btn-ghost btn-xs" onClick={() => logOut()}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

function NavBar() {
  const { logIn, logOut, isAuthenticated, currentUser } = useAuth()
  return (
    <header className="navbar bg-neutral text-neutral-content">
      <div className="flex-1">
        <Link to={routes.home()} className="btn btn-ghost text-xl normal-case">
          Cross-City Cup
        </Link>
      </div>
      <div className="flex-none gap-2">
        {isAuthenticated && currentUser ? (
          <UserMenu user={currentUser} logOut={logOut} />
        ) : (
          <button className="btn btn-ghost btn-sm" onClick={() => logIn()}>
            Log in
          </button>
        )}
      </div>
    </header>
  )
}

export default NavBar
