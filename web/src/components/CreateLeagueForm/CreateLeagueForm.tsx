import { zodResolver } from '@hookform/resolvers/zod'
import type { CreateLeagueMutationVariables } from 'types/graphql'
import { z } from 'zod'

import { Form, Submit, useForm } from '@redwoodjs/forms'

import {
  DateFieldRenderer,
  FieldWrapper,
  NumberFieldRenderer,
  TextFieldRenderer,
} from 'src/components/forms'

const CREATE_LEAGUE_FORM_INPUT = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  seasonName: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  sessionCount: z
    .number()
    .int()
    .min(1, 'There must be at least 1 session')
    .max(10, 'No more than 10 sessions'),
  startDate: z.date().min(new Date(), 'Season must start in the future'),
})
type CREATE_LEAGUE_FORM_INPUT = z.infer<typeof CREATE_LEAGUE_FORM_INPUT>

const CreateLeagueForm = ({
  onSubmit,
}: {
  onSubmit: (result: CreateLeagueMutationVariables) => void | Promise<void>
}) => {
  const formMethods = useForm({
    mode: 'onBlur',
    resolver: zodResolver(CREATE_LEAGUE_FORM_INPUT),
  })
  const wrappedOnSubmit = async (input: CREATE_LEAGUE_FORM_INPUT) => {
    const sessions = Array.from(Array(input.sessionCount).keys()).map((i) => {
      const startDate = new Date(input.startDate)
      startDate.setDate(startDate.getDate() + i * 14) // add 2 weeks
      const endDate = new Date(startDate)
      endDate.setDate(startDate.getDate() + 13)
      return {
        startDate: startDate.toISOString().substring(0, 10),
        endDate: endDate.toISOString().substring(0, 10),
      }
    })
    await onSubmit({
      name: input.name,
      season: { name: input.seasonName, sessions },
    })
    formMethods.reset()
  }
  return (
    <Form
      onSubmit={wrappedOnSubmit}
      formMethods={formMethods}
      autoComplete="off"
      className="flex flex-col gap-4"
    >
      <FieldWrapper label="League name" name="name">
        {TextFieldRenderer()}
      </FieldWrapper>
      <FieldWrapper label="Season name" name="seasonName">
        {TextFieldRenderer()}
      </FieldWrapper>
      <FieldWrapper label="Number of sessions" name="sessionCount">
        {NumberFieldRenderer({ min: 1, max: 10 })}
      </FieldWrapper>
      <FieldWrapper label="Start date" name="startDate">
        {DateFieldRenderer()}
      </FieldWrapper>
      <Submit className="btn btn-primary">Create</Submit>
    </Form>
  )
}

export default CreateLeagueForm
