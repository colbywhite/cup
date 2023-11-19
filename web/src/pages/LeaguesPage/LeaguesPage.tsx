import { useRef } from 'react'

import { MetaTags } from '@redwoodjs/web'

import CreateLeagueDialog from 'src/components/CreateLeagueDialog/CreateLeagueDialog'
import LeaguesCell from 'src/components/LeaguesCell'

const LeaguesPage = () => {
  const dialog = useRef<HTMLDialogElement | null>(null)
  return (
    <main className="w-full p-4">
      <MetaTags title="Leagues" description="Leagues page" />
      <h1 className="mb-4 text-center text-2xl font-bold">Your leagues</h1>
      <button
        className="btn btn-primary"
        onClick={() => {
          dialog.current?.show()
        }}
      >
        Create
      </button>
      <CreateLeagueDialog
        ref={dialog}
        onCompleted={() => dialog.current?.close()}
      />
      <LeaguesCell />
    </main>
  )
}

export default LeaguesPage
