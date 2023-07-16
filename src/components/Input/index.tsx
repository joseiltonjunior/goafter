import { TextInput, TextInputProps } from 'react-native'

interface inputProps extends TextInputProps {}

export function Input({ ...rest }: inputProps) {
  return (
    <TextInput
      className="bg-gray-500 rounded-md overflow-hidden pl-4 text-white border border-gray-700 focus:border-gray-300"
      {...rest}
    />
  )
}
