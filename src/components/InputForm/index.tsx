import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native'
import { useController, FieldError, Control } from 'react-hook-form'
import { IconCustom } from '@components/IconCustom'
import { useState } from 'react'

interface InputFormProps extends TextInputProps {
  name: string
  control: Control<any>
  icon?: string
  error?: FieldError
  password?: boolean
}

export function InputForm({
  control,
  name,
  icon,
  error,
  password,
  ...rest
}: InputFormProps) {
  const { field } = useController({ name, control, defaultValue: '' })
  const [isVisible, setIsVisible] = useState(true)

  return (
    <>
      <View
        className={`flex-row bg-gray-500 rounded-md px-4 items-center border border-gray-400 ${
          error && 'border-red-600'
        }`}
      >
        {icon && <IconCustom name={icon} size={20} className="mr-2" />}
        <TextInput
          className="placeholder:text-base text-white flex-1"
          value={field.value}
          onChangeText={field.onChange}
          secureTextEntry={password && isVisible ? true : !isVisible && false}
          {...rest}
        />
        {password && (
          <TouchableOpacity
            hitSlop={16}
            onPress={() => setIsVisible(!isVisible)}
            activeOpacity={0.5}
          >
            <IconCustom name={!isVisible ? 'eye-slash' : 'eye'} size={20} />
          </TouchableOpacity>
        )}
      </View>
      <Text className="text-gray-400 text-right text-sm mb-1">
        {error?.message}
      </Text>
    </>
  )
}
