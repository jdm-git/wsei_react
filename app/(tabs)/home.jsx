import { View, Text, SafeAreaView, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import PostCard from '../../components/PostCard'

const Home = () => {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  }
  const [posts, setPosts] = useState([]);

  const url = "https://jsonplaceholder.typicode.com/posts?_limit=10";

  useEffect(() => {
    fetch(url)
      .then(res => {
        if (!res.ok) {
          return Error("Oh no");
        }
        return res.json();
      })
      .then(data => setPosts(data));
  });


  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={( { item } ) => (
          <PostCard post={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
              <View className="justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Witaj {}
                  </Text>
                  <Text className="text-2xl font-psemibold text-white">
                    WseiApp
                  </Text>
                </View>
                <View className="mt-1.5">
                  <Image 
                    source={images.logo}
                    className="w-20 h-20"
                    resizeMode='contain'
                  />
              </View>
              </View>
              <SearchInput />

              <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-gray-100 text-lg font-pregular mb-3">
                  Ostatnie posty
                </Text>
                

              </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Home