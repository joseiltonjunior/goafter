import { useCallback } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { setSaveUser } from '@storage/modules/user/actions'
import { UserProps } from '@storage/modules/user/types'
import { ReduxProps } from '@storage/index'
import { AfterProps } from '@utils/types/after'

interface HandleFavoritesProps {
  name: string
  user: UserProps
}

export function useFavorites() {
  const dispatch = useDispatch()
  const afters = useSelector<ReduxProps, AfterProps[]>((state) => state.afters)
  const user = useSelector<ReduxProps, UserProps>((state) => state.user)

  const favoriteList = useCallback(() => {
    const filter = afters.filter((after) =>
      user.favoritesAfters.includes(after.name),
    )

    return filter
  }, [afters, user.favoritesAfters])

  const addFavorite = useCallback(
    async ({ name, user }: HandleFavoritesProps) => {
      const userRef = firestore().collection('users').doc(user.uid)
      const userDoc = await userRef.get()

      if (userDoc.exists) {
        const userData = userDoc.data() as UserProps

        const updatedFavorites = [...userData.favoritesAfters, name]

        await userRef.update({
          favoritesAfters: updatedFavorites,
        })

        dispatch(
          setSaveUser({ ...userData, favoritesAfters: updatedFavorites }),
        )
      }
    },
    [dispatch],
  )

  const removeFavorite = useCallback(
    async ({ name, user }: HandleFavoritesProps) => {
      const userRef = firestore().collection('users').doc(user.uid)
      const userDoc = await userRef.get()

      if (userDoc.exists) {
        const userData = userDoc.data() as UserProps

        const updatedFavorites = user.favoritesAfters.filter(
          (item) => item !== name,
        )

        await userRef.update({
          favoritesAfters: updatedFavorites,
        })

        dispatch(
          setSaveUser({ ...userData, favoritesAfters: updatedFavorites }),
        )
      }
    },
    [dispatch],
  )

  return { addFavorite, removeFavorite, favoriteList }
}
