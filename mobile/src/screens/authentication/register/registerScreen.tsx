import React, {FC, useRef} from 'react'
import {Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {RootStackScreenProps} from 'src/@types/react-navigation/types'
import {Container} from 'components/common/Container'
import {Input} from 'components/common/Input'
import {Controller} from 'react-hook-form'
import {FilledButton} from 'components/common/FilledButton'
import {useRegisterWithEmail} from './hooks/useRegisterWithEmail'

type Props = RootStackScreenProps<'Register'>

export const RegisterScreen: FC<Props> = ({navigation}) => {
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)

  const {
    registerForm: {control, handleSubmit},
    onSubmit,
    isLoading,
  } = useRegisterWithEmail()

  const onSubmitHandler = () => handleSubmit(onSubmit)()

  const closeKeyboard = () => Keyboard.dismiss()

  const navigateToLoginScreen = () => navigation.navigate('Login')

  return (
    <Container onPress={closeKeyboard}>
      <Text style={styles.title}>Register</Text>

      <View style={{marginVertical: 32}}>
        <Controller
          render={({field: {value, onChange}, fieldState: {error}}) => (
            <Input
              returnKeyType={'next'}
              label={'Name'}
              autoCapitalize={'words'}
              value={value}
              onChangeText={onChange}
              onSubmitEditing={() => emailRef.current?.focus()}
              error={error?.message}
            />
          )}
          name={'name'}
          control={control}
        />
        <Controller
          render={({field: {value, onChange}, fieldState: {error}}) => (
            <Input
              ref={emailRef}
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
      <FilledButton isLoading={isLoading} label={'Register'} onPress={onSubmitHandler} />

      <View style={styles.registerContainer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={navigateToLoginScreen}>
          <Text>Go to Login</Text>
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
