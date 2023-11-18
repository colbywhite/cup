import { forwardRef } from 'react'

import type {
  CreateGolferMutation,
  CreateGolferMutationVariables,
} from 'types/graphql'

import { useMutation } from '@redwoodjs/web'

import CreateGolferForm from 'src/components/CreateGolferForm/CreateGolferForm'

const CREATE_GOLFER = gql`
  mutation CreateGolferMutation($ghinNumber: Int!) {
    createGolfer(input: { ghinNumber: $ghinNumber }) {
      email
    }
  }
`

type CreateGolferDialogProps = {
  onCompleted?: () => void
}

const CreateGolferDialog = forwardRef<
  HTMLDialogElement,
  CreateGolferDialogProps
>(({ onCompleted }, ref) => {
  const [mutate, { loading }] = useMutation<
    CreateGolferMutation,
    CreateGolferMutationVariables
  >(CREATE_GOLFER, { onCompleted })
  const onSubmit = async (ghinNumber: number) => {
    await mutate({ variables: { ghinNumber } })
  }
  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Connect your GHIN</h3>
        {loading ? (
          <p>
            <span className="loading loading-ring loading-lg"></span>
          </p>
        ) : (
          <CreateGolferForm onSubmit={onSubmit} />
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

export default CreateGolferDialog
