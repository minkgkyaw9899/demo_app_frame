import React, {FC, PropsWithChildren, ReactElement} from 'react'
import {GestureResponderEvent, Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import {DeviceHeight, DeviceWidth} from 'constants/styles'

type Props = PropsWithChildren & {
  style?: StyleProp<ViewStyle>
  onPress?: ((event: GestureResponderEvent) => void) | undefined
}

export const Container: FC<Props> = (props): ReactElement => {
  const {children, style, onPress} = props
  return (
    <Pressable style={styles.flex} onPress={onPress}>
      <View style={[styles.container, style]}>{children}</View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
    minHeight: DeviceHeight,
    minWidth: DeviceWidth,
  },
})
