import { Image, Text, TouchableOpacity, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import { InputForm } from '@components/InputForm'
import { useForm } from 'react-hook-form'
import logoAfter from '@assets/after.png'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@components/Button'

import { HeaderScreen } from '@components/HeaderScreen'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProps } from '@routes/routes'
import { useDispatch } from 'react-redux'
import { setSaveUser } from '@storage/modules/user/actions'

interface FormDataProps {
  email: string
  password: string
}

const schema = z.object({
  email: z.string().email('* e-mail inválido'),
  password: z
    .string()
    .min(6, '* mínimo 6 caracteres')
    .refine(
      (value) => /^(?=.*[A-Za-z])(?=.*\d)/.test(value),
      '* deve conter letras e números',
    ),
})

export function SignIn() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  const dispatch = useDispatch()

  const navigation = useNavigation<StackNavigationProps>()

  function handleSignIn(data: FormDataProps) {
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        const { email, displayName, photoURL, uid } = result.user
        dispatch(setSaveUser({ email, displayName, photoURL, uid }))
        navigation.navigate('Home', {})
      })
      .catch(() => {
        setError('email', { message: '* credenciais inválidas' })
        setError('password', { message: '* credenciais inválidas' })
      })
  }

  return (
    <View className="flex-1 mt-10 p-4">
      <HeaderScreen title="Entrar" />
      <View className="flex-1 items-center mt-10">
        <Image source={logoAfter} alt="logo after" className="w-28 h-28" />
        <View className="w-full mt-4 px-4">
          <InputForm
            icon="at"
            error={errors.email}
            name="email"
            keyboardType="email-address"
            placeholder="Digite seu e-mail"
            autoCapitalize="none"
            control={control}
          />
          <InputForm
            password
            icon="key"
            error={errors.password}
            name="password"
            autoCapitalize="none"
            placeholder="Digite sua senha"
            control={control}
          />
          <Button
            onPress={handleSubmit(handleSignIn)}
            activeOpacity={0.4}
            className="mt-8"
          >
            Entrar
          </Button>
        </View>
        <TouchableOpacity
          className="mt-8"
          activeOpacity={0.4}
          onPress={() => navigation.navigate('Register')}
        >
          <Text className="font-medium text-base text-white">
            Não possui conta?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
