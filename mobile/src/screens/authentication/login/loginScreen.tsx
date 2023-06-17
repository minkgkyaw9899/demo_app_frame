import React, {FC, useRef} from 'react'
import {Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {RootStackScreenProps} from 'src/@types/react-navigation/types'
import {Container} from 'components/common/Container'
import {Input} from 'components/common/Input'
import {Controller} from 'react-hook-form'
import {FilledButton} from 'components/common/FilledButton'
import {useLoginWithEmail} from 'screens/authentication/login/hooks/useLoginWithEmail'

type Props = RootStackScreenProps<'Login'>

export const LoginScreen: FC<Props> = ({navigation}) => {
  const passwordRef = useRef<TextInput>(null)

  const {loginForm, onSubmit, isLoading} = useLoginWithEmail()

  const {control, handleSubmit} = loginForm

  const closeKeyboard = () => Keyboard.dismiss()

  const navigateToRegisterScreen = () => navigation.navigate('Register')

  const onSubmitHandler = () => handleSubmit(onSubmit)()

  return (
    <Container onPress={closeKeyboard}>
      <Text style={styles.title}>Login</Text>

      <View style={{marginVertical: 32}}>
        <Controller
          render={({field: {value, onChange}, fieldState: {error}}) => (
            <Input
              keyboardType={'email-address'}
              returnKeyType={'next'}
              label={'Email'}
              autoCapitalize={'none'}
              value={value}
              onChangeText={onChange}
              onSubmitEditing={() => passwordRef.current?.focus()}
              error={error?.message}
            />
          )}
          name={'email'}
          control={control}
        />
        <Controller
          render={({field: {value, onChange}, fieldState: {error}}) => (
            <Input
              ref={passwordRef}
              returnKeyType={'next'}
              label={'Password'}
              autoCapitalize={'none'}
              value={value}
              onChangeText={onChange}
              secureTextEntry
              error={error?.message}
              onSubmitEditing={onSubmitHandler}
            />
          )}
          name={'password'}
          control={control}
        />
      </View>
      <FilledButton label={'Login'} isLoading={isLoading} onPress={onSubmitHandler} />

      <View style={styles.registerContainer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={navigateToRegisterScreen}>
          <Text>Go to Register</Text>
        </TouchableOpacity>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: '700',
    color: '#000000',
  },
  registerContainer: {flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 24},
})
