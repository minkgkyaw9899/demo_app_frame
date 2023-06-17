import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {BellOutlineIcon} from 'components/common/Icon'

export const HomeNotificationHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24}}>FPB Team</Text>
      <BellOutlineIcon />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderColor: 'rgba(71, 85, 105, 0.3)',
    borderBottomWidth: 0.6,
  },
})
