import type { ReactNode } from 'react'

import {
  DateField,
  FieldError,
  type InputFieldProps,
  NumberField,
  TextField,
} from '@redwoodjs/forms'

export const FieldWrapper = ({
  name,
  label,
  children,
}: {
  children: (props: FieldRendererProps) => ReactNode
  label: string
  name: string
}) => {
  return (
    <>
      <label className="label">
        <span className="label-text">{label}</span>
        {children({ name })}
      </label>
      <FieldError
        name={name}
        className="my-1 rounded border border-error-content bg-error p-1 text-sm italic text-error-content"
      />
    </>
  )
}

const FIELD_CLASS_NAME = 'input input-bordered w-full max-w-xs'

type FieldRendererProps = { name: string }
export const TextFieldRenderer = (
  props?: Omit<InputFieldProps, 'name' | 'className'>
) => {
  return ({ name }: FieldRendererProps) => (
    <TextField name={name} className={FIELD_CLASS_NAME} {...props} />
  )
}
export const NumberFieldRenderer = (
  props?: Omit<InputFieldProps, 'name' | 'className'>
) => {
  return ({ name }: FieldRendererProps) => (
    <NumberField name={name} className={FIELD_CLASS_NAME} {...props} />
  )
}
export const DateFieldRenderer = (
  props?: Omit<InputFieldProps, 'name' | 'className'>
) => {
  return ({ name }: FieldRendererProps) => (
    <DateField name={name} className={FIELD_CLASS_NAME} {...props} />
  )
}
