import React, {FC, ReactElement} from 'react'
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'

type Props = {
  label: string
  labelStyle?: StyleProp<TextStyle>
  onPress: ((event: GestureResponderEvent) => void) | undefined
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  isLoading?: boolean
}

export const FilledButton: FC<Props> = (props): ReactElement => {
  const {isLoading, label, labelStyle, onPress, disabled, style} = props

  const buttonBackgroundColor =
    disabled || isLoading
      ? {backgroundColor: '#52525b'}
      : {backgroundColor: '#323334'}

  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      style={[styles.button, style, buttonBackgroundColor]}
      onPress={onPress}>
      {isLoading && <ActivityIndicator color={'#FCFCFC'} />}
      <Text style={[styles.label, labelStyle]}>
        {isLoading ? 'Loading' : label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FCFCFC',
    textAlign: 'center',
  },
})