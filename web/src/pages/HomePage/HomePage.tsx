import { useRef } from 'react'

import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import CreateGolferDialog from 'src/components/CreateGolferDialog/CreateGolferDialog'

const HomePage = () => {
  const { currentUser, reauthenticate } = useAuth()
  const dialog = useRef<HTMLDialogElement | null>(null)
  if (!currentUser) {
    return null
  }
  const isGolfer = currentUser.roles.includes('golfer')
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <h1 className="font-bold text-2xl my-4">
        Hello {currentUser.name}
      </h1>
      <section>
        {isGolfer ? (
          <p>Join a tour</p>
        ) : (
          <>
            <p>Connect your GHIN in order to participate.</p>
            <button
              className="btn btn-primary"
              onClick={() => dialog.current?.showModal()}
            >
              Connect
            </button>
            <CreateGolferDialog ref={dialog} onCompleted={reauthenticate} />
          </>
        )}
      </section>
    </>
  )
}

export default HomePage
