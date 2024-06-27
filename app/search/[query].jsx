import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { images } from '../../constants'
import PostCard from '../../components/PostCard'
import SearchInput from '../../components/SearchInput'

const Search = () => {

  const { query } = useLocalSearchParams()
  const [refreshing, setRefreshing] = useState(false)

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
  var filteredPosts = posts.filter(item => item.title.includes(query));


  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        renderItem={( { item } ) => (
          <PostCard post={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
              <View className="justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Wyniki wyszukiwania
                  </Text>
                  <Text className="text-2xl font-psemibold text-white">
                    {query}
                  </Text>
                </View>
              </View>
              <SearchInput initialQuery={query}/>

          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Search