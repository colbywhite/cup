import { forwardRef } from 'react'

import type {
  CreateLeagueMutation,
  CreateLeagueMutationVariables,
} from 'types/graphql'

import { useMutation } from '@redwoodjs/web'

import CreateLeagueForm from 'src/components/CreateLeagueForm/CreateLeagueForm'
import { QUERY as LEAGUES_CELL_QUERY } from 'src/components/LeaguesCell/LeaguesCell'

const CREATE_LEAGUE = gql`
  mutation CreateLeagueMutation($name: String!, $season: CreateSeasonInput!) {
    createLeague(input: { name: $name, season: $season }) {
      id
      name
    }
  }
`

type CreateLeagueDialogProps = {
  onCompleted?: () => void
}

const CreateLeagueDialog = forwardRef<
  HTMLDialogElement,
  CreateLeagueDialogProps
>(({ onCompleted }, ref) => {
  const [mutate, { loading }] = useMutation<
    CreateLeagueMutation,
    CreateLeagueMutationVariables
  >(CREATE_LEAGUE, {
    onCompleted,
    refetchQueries: [{ query: LEAGUES_CELL_QUERY }],
  })
  const onSubmit = async (variables: CreateLeagueMutationVariables) => {
    await mutate({ variables })
  }
  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box text-center">
        <h3 className="pb-8 text-lg font-bold">Create a league</h3>
        {loading ? (
          <p>
            <span className="loading loading-ring loading-lg"></span>
          </p>
        ) : (
          <CreateLeagueForm onSubmit={onSubmit} />
        )}
        <form method="dialog">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
        </form>
      </div>
    </dialog>
  )
})

export default CreateLeagueDialog
