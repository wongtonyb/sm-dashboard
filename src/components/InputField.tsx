import { FieldError } from 'react-hook-form'

type InputFieldProps = {
   label: string
   type?: string
   register: any
   name: string
   defaultValue?: string
   error?: FieldError
   inputProps?: React.InputHTMLAttributes<HTMLInputElement>
   hidden?: boolean
}

const InputField = ({
   label,
   type,
   register,
   name,
   defaultValue,
   error,
   inputProps,
   hidden,
}: InputFieldProps) => {
   return (
      <div
         className={hidden ? 'hidden' : 'flex flex-col gap-2 w-full md:w-1/4'}
      >
         <label className="text-xs text-gray-500">{label}</label>
         <input
            type={type}
            {...register(name)}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            defaultValue={defaultValue}
            {...inputProps}
         />
         {error?.message && (
            <p className="text-xs text-red-400">{error.message.toString()}</p>
         )}
      </div>
   )
}

/*
The register function in React Hook Form is a core method 
that connects form inputs to the form's state management system and validation rules.

Can view form's state via formState object fro react-hook-form
- Direct Destructing
const { 
  formState: { 
    isDirty,
    isValid,
    errors,
    touchedFields,
    submitCount 
  } 
} = useForm();

- useEffect
const { formState } = useForm();
useEffect(() => {
  console.log('Form State:', formState);
}, [formState]);


The formState object includes key information about your form:

    isDirty: Indicates if any field has been modified

    errors: Contains validation errors

    isValid: Shows if the form is error-free

    touchedFields: Shows which fields user has interacted with

    isSubmitting: Indicates form submission status

    submitCount: Number of submission attempts

*/

export default InputField
