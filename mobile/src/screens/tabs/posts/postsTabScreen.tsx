import React, {type FC} from 'react'
import {TabScreenProps} from 'src/@types/react-navigation/types'
import {StyleSheet, Text, View} from 'react-native'
import {Container} from 'components/common/Container'
import {Controller} from 'react-hook-form'
import {Input} from 'components/common/Input'
import {useCreatePost} from './hooks/useCreatePost'
import {FilledButton} from 'components/common/FilledButton'

type Props = TabScreenProps<'PostTab'>

export const PostsTabScreen: FC<Props> = () => {
  const {createPostForm, isLoading, onSubmit} = useCreatePost()

  const onSubmitHandler = () => createPostForm.handleSubmit(onSubmit)()

  return (
    <Container style={styles.rootContainer}>
      <Text style={styles.title}>Create Post</Text>
      <View
        style={{
          marginTop: 16,
        }}>
        <Controller
          render={({field: {value, onChange}, fieldState: {error}}) => (
            <Input
              label={"Post's Title"}
              autoCapitalize={'none'}
              value={value}
              onChangeText={onChange}
              error={error?.message}
            />
          )}
          name={'title'}
          control={createPostForm.control}
        />
        <Controller
          render={({field: {value, onChange}, fieldState: {error}}) => (
            <Input
              label={"Post's Body"}
              autoCapitalize={'none'}
              value={value}
              onChangeText={onChange}
              error={error?.message}
            />
          )}
          control={createPostForm.control}
          name={'body'}
        />
      </View>
      <FilledButton label="Create" onPress={onSubmitHandler} isLoading={isLoading} />
    </Container>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 25,
    textAlign: 'center',
  },
})
