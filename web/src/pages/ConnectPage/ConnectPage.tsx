import { useRef } from 'react'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import CreateGolferDialog from 'src/components/CreateGolferDialog/CreateGolferDialog'

const ConnectPage = () => {
  const { currentUser } = useAuth()
  const dialog = useRef<HTMLDialogElement | null>(null)
  return (
    <section>
      <MetaTags title="Connect GHIN" description="Connect page" />

      <h1 className="my-4 text-2xl font-bold">Hello {currentUser.name}</h1>
      {currentUser.roles.includes('golfer') ? (
        <p>GHIN: {currentUser.ghinNumber}</p>
      ) : (
        <>
          <p>Connect your GHIN account in order to participate.</p>
          <button
            className="btn btn-primary"
            onClick={() => dialog.current?.showModal()}
          >
            Connect
          </button>
          <CreateGolferDialog
            ref={dialog}
            onCompleted={() => navigate(routes.home())}
          />
        </>
      )}
    </section>
  )
}

export default ConnectPage
