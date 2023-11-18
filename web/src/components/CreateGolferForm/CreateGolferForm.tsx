import type { FormEventHandler } from 'react'

const GHIN_NUMBER_INPUT_NAME = 'ghinNumber'

const CreateGolferForm = ({
  onSubmit,
}: {
  onSubmit: (ghinNumber: number) => void | Promise<void>
}) => {
  const wrappedOnSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const ghinNumberInput = new FormData(event.currentTarget).get(
      GHIN_NUMBER_INPUT_NAME
    )
    const ghinNumber = Number(ghinNumberInput)
    if (isNaN(ghinNumber)) {
      throw new Error('invalid GHIN number')
    }
    onSubmit(ghinNumber)
  }
  return (
    <form onSubmit={wrappedOnSubmit}>
      <label className="label">
        <span className="label-text">GHIN number</span>
        <input
          type="text"
          name={GHIN_NUMBER_INPUT_NAME}
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <button className="btn btn-primary" type="submit">
        Connect
      </button>
    </form>
  )
}

export default CreateGolferForm
