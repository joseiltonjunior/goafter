import { Image, Keyboard, Text, TouchableOpacity, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
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
import { useState } from 'react'
import { UserProps } from '@storage/modules/user/types'

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

  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation<StackNavigationProps>()

  async function handleFetchDataUser(userUid: string) {
    firestore()
      .collection('users')
      .doc(userUid)
      .get()
      .then((querySnapshot) => {
        const user = querySnapshot.data() as UserProps
        dispatch(setSaveUser(user))
        navigation.navigate('Home', {})
      })
      .catch((error) =>
        console.log('Erro ao buscar os dados do usuário no Firestore:', error),
      )
      .finally(() => setIsLoading(false))
  }

  function handleAuthenticate(data: FormDataProps) {
    Keyboard.dismiss()
    setIsLoading(true)
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        const { uid } = result.user

        handleFetchDataUser(uid)
      })
      .catch(() => {
        setError('email', { message: '* credenciais inválidas' })
        setError('password', { message: '* credenciais inválidas' })
        setIsLoading(false)
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
            onPress={handleSubmit(handleAuthenticate)}
            activeOpacity={0.4}
            className="mt-8"
            isLoading={isLoading}
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
