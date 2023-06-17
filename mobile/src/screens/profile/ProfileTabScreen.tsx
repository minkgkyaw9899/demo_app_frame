import React, {type FC} from 'react'
import {TabScreenProps} from 'src/@types/react-navigation/types'
import {Container} from 'components/common/Container'
import {useAppSelector} from 'hooks/useAppSelector'
import {logoutUser, selectedAuthUser} from 'features/authUserSlice'
import {useAppDispatch} from 'hooks/useAppDispatch'
import {StyleSheet, Text, View} from 'react-native'
import {FilledButton} from 'components/common/FilledButton'

type Props = TabScreenProps<'ProfileTab'>

export const ProfileTabScreen: FC<Props> = ({navigation}) => {
  const {user} = useAppSelector(selectedAuthUser)

  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
    // return navigation.navigate('Login')
  }

  return (
    <Container style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.label}>Name&nbsp;:&nbsp;</Text>
        <Text style={styles.description}>{user?.name}</Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.label}>Email&nbsp;:&nbsp;</Text>
        <Text style={styles.description}>{user?.email}</Text>
      </View>
      {/*<FilledButton label={'Edit'} onPress={undefined} />*/}
      <FilledButton label={'Logout'} onPress={handleLogout} style={styles.btn} />
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center', gap: 24},
  wrapper: {flexDirection: 'row', alignItems: 'center', width: '70%'},
  label: {fontSize: 16, color: '#000000', textAlign: 'left'},
  description: {fontSize: 16, color: '#000000', fontWeight: 'bold'},
  btn: {width: '70%'},
})
