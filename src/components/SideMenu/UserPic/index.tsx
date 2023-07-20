import { IconCustom } from '@components/IconCustom'

import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import { useDispatch } from 'react-redux'
import { setSaveUser } from '@storage/modules/user/actions'
import { UserProps } from '@storage/modules/user/types'
import { useState } from 'react'
import colors from 'tailwindcss/colors'

interface userPicProps {
  user: UserProps
}

export function UserPic({ user }: userPicProps) {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  async function handleUpdateUser(picUrl: string) {
    firestore()
      .collection('users')
      .doc(user.uid)
      .update({ photoURL: picUrl })
      .then(() => {
        dispatch(setSaveUser({ ...user, photoURL: picUrl }))
      })
      .catch((err) => console.log('tratar error', err))
      .finally(() => setIsLoading(false))
  }

  async function handleUploadImage() {
    const options = {
      maxWidth: 300,
      maxHeight: 300,
    }

    await launchImageLibrary(
      { ...options, mediaType: 'photo' },
      async (response) => {
        if (response.errorCode) {
          console.log('Erro ao fazer o upload da imagem: ', response.errorCode)
        } else if (response.assets) {
          const { uri } = response.assets[0]

          if (uri) {
            setIsLoading(true)
            const imageRef = storage().ref(`profile_images/${user.uid}`)
            await imageRef.putFile(uri)
            const downloadURL = await imageRef.getDownloadURL()

            handleUpdateUser(downloadURL)
          }
        }
      },
    ).catch((e) => console.log(e, 'tratar error'))
  }

  return (
    <View className="h-28 w-28 ml-auto mr-auto">
      <View className="border-solid border-2 border-gray-100 rounded-full  overflow-hidden h-28 w-28 items-center justify-center">
        {isLoading && (
          <ActivityIndicator
            size={50}
            color={colors.white}
            className="absolute z-10"
          />
        )}
        {!user.photoURL ? (
          <IconCustom name="user" size={60} className="text-gray-300" />
        ) : (
          <Image
            className="h-28 w-28"
            source={{
              uri: user.photoURL,
            }}
            alt="pic profile user"
          />
        )}
      </View>
      {user.uid && (
        <View className="bg-gray-950 absolute bottom-0 right-0 rounded-full overflow-hidden border-2 border-white">
          <TouchableOpacity
            className="bg-gray-500 p-2"
            activeOpacity={0.5}
            onPress={() => handleUploadImage()}
          >
            <IconCustom name="camera" size={18} className="text-white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
