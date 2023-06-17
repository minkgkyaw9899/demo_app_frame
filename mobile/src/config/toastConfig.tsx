import {ErrorToast, SuccessToast} from 'react-native-toast-message'
import {StyleSheet} from 'react-native'

export const toastConfig = {
  /**
   * @success type
   * @param props
   */
  success: (props: any) => (
    <SuccessToast
      {...props}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
  /**
   * @Error type
   * @param props
   */
  error: (props: any) => (
    <ErrorToast
      {...props}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
}

const styles = StyleSheet.create({
  text1: {
    fontSize: 20,
    fontWeight: '400',
  },
  text2: {
    fontSize: 15,
    fontWeight: '400',
  },
})
