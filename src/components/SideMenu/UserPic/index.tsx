import { IconCustom } from '@components/IconCustom'
import { Image, View } from 'react-native'

interface userPicProps {
  userPicUrl: string | null
}

export function UserPic({ userPicUrl }: userPicProps) {
  return (
    <View className="border-solid border-2 border-gray-100 rounded-full ml-auto mr-auto overflow-hidden h-28 w-28 items-center justify-center">
      {!userPicUrl ? (
        <IconCustom name="user" size={60} className="text-gray-300" />
      ) : (
        <Image
          className="h-28 w-28"
          source={{
            uri: userPicUrl,
          }}
          alt="pic profile user"
        />
      )}
    </View>
  )
}
