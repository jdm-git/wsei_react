import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import PostCard from '../../components/PostCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'
import { signOut } from '../../lib/appwrite'
import { router } from 'expo-router'

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null)
    setIsLoggedIn(false);

    router.replace('/sign-in');
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full justify-center items-center mt-6 mb-12 px-4">
        <TouchableOpacity
          className="w-full items-end mb-10"
          onPress={logout}
        >
          <Image 
            source={icons.logout}
            resizeMode='contain'
            className="w-6 h-6"
          />
        </TouchableOpacity>
        <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
          <Image 
            source={{uri: user?.avatar }}
            className="w-[90% h-[90%] rounded-lg"
            resizeMode='cover'
          />
        </View>
        <InfoBox
          title={user?.username}
          containerStyles='mt-5'
          titleStyles="title-lg"
        />
        <View className="mt-5 flex-row">
        <InfoBox
          title="5"
          subtitle="Postów"
          containerStyles='mr-10'
          titleStyles="title-xl"
        />
        <InfoBox
          title="4,6"
          subtitle="Średnia ocena"
          containerStyles='mr-10'
          titleStyles="title-xl"
        />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Profile