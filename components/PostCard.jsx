import { View, Text } from 'react-native'
import React from 'react'

const PostCard = ({ post: { title, body, userId, id }}) => {
  return (
    <View className="flex-col item-center px-4 mb-14 text-white">
      <Text className="text-base text-white">{title}</Text>
      <Text className="text-xs text-white">{body}</Text>
    </View>
  )
}

export default PostCard