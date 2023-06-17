import React, {forwardRef, useCallback, useEffect} from 'react'
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {Noop} from 'react-hook-form'

type Props = TextInputProps & {
  label: string
  onBlur?: Noop
  error?: string
}
export const Input = forwardRef<TextInput, Props>((props, ref) => {
  const {label, error, value, onBlur, onChangeText, onSubmitEditing} = props

  const animationValue = useSharedValue(0)

  // @ts-ignore
  const animatedLabelStyle = useAnimatedStyle(() => {
    const translateY = interpolate(animationValue.value, [0, 1], [35, 10], {
      extrapolateRight: Extrapolation.CLAMP,
    })
    return {
      transform: [{translateY}],
    }
  })

  const onFocusHandler = useCallback(() => {
    animationValue.value = withTiming(1)
  }, [animationValue.value])

  const onBlueHandler = useCallback(() => {
    if (onBlur) {
      onBlur()
    }
    if (value !== undefined && value.trim() !== '') {
      animationValue.value = withTiming(1)
    } else {
      animationValue.value = withTiming(0)
    }
  }, [onBlur, value, animationValue.value])

  useEffect(() => {
    if (value) {
      animationValue.value = withTiming(1)
    }
  }, [animationValue, value])

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.label, animatedLabelStyle]}>{label}</Animated.Text>
      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocusHandler}
        onBlur={onBlueHandler}
        style={styles.input}
        onSubmitEditing={onSubmitEditing}
        {...props}
      />
      <Text style={styles.errorText}>{error}</Text>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  label: {
    paddingLeft: 4.5,
    color: '#4B4D4E',
    fontSize: 14,
  },
  input: {
    borderBottomWidth: 1,
    paddingBottom: 3,
    fontSize: 16,
    color: '#191A1A',
    borderBottomColor: '#191A1A',
  },
  errorText: {
    color: '#be123c',
    fontWeight: '600',
  },
})
