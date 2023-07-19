import {
  Image,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
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

interface FormDataProps {
  email: string
  name: string

  password: string
}

const schema = z.object({
  name: z.string().nonempty('* nome é obrigatório'),
  email: z.string().email('* email inválido'),
  password: z.string().min(6, '* mínimo 6 caracteres'),
})

export function Register() {
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
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        const { email, photoURL, uid } = result.user

        const name = data.name

        result.user
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            firestore()
              .collection('users')
              .doc(uid)
              .set({
                email,
                displayName: name,
                photoURL,
                uid,
              })
              .then(() => {
                dispatch(
                  setSaveUser({ email, displayName: name, photoURL, uid }),
                )
                navigation.navigate('Home', {})
              })
              .catch((error) => {
                console.log(error, 'save')
              })
          })
          .catch((error) => {
            console.log(error, 'att')
          })
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setError('email', { message: '* E-mail já está em uso!' })
        }

        if (error.code === 'auth/invalid-email') {
          setError('email', { message: '* E-mail inválido!' })
        }
      })
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 mt-10 p-4">
          <HeaderScreen title="Cadastrar" />
          <View className="flex-1 items-center mt-10">
            <Image source={logoAfter} alt="logo after" className="w-28 h-28" />
            <View className="w-full mt-8 px-4">
              <InputForm
                icon="user"
                error={errors.name}
                name="name"
                placeholder="Digite seu nome"
                autoCapitalize="words"
                control={control}
              />
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
                Cadastrar
              </Button>
            </View>
            <TouchableOpacity
              className="mt-8"
              activeOpacity={0.4}
              onPress={() => navigation.navigate('SignIn')}
            >
              <Text className="font-medium text-base text-white">
                Já possui conta?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
