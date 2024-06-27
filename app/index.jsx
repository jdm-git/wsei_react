import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
    const { isLoading, isLoggedIn } = useGlobalContext();

    if(!isLoading && isLoggedIn) return <Redirect href="/home"/>
  return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{height: '100%'}}> 
            <View className="w-full justify-center items-center min-h-[85vh] px-4">
                <Image 
                    source={images.logo}
                    resizeMode='contain'
                    className="w-[130px] h-[84px]"
                />
                <Image 
                    source={images.cards}
                    resizeMode='contain'
                    className="max-w-[380px] h-[300px] w-full"
                />
                <View className="relative mt-5">
                    <Text className="text-3xl text-white font-bold text-center">Dołącz do nas, do{' '}
                        <Text className="text-secondary">WSEI</Text>
                    </Text>
                </View>
                <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
                    W Wyższej Szkole Ekonomii i Informatyki przyjęcia na wszystkie kierunki studiów I i II stopnia odbywają się bez egzaminów wstępnych – liczba miejsc jest ograniczona, o przyjęciu decyduje kolejność zapisu.
                </Text>
                <CustomButton 
                    title="Zarejestruj się już teraz!"
                    handlePress={() => {router.push('/sign-in')}}
                    containerStyles="w-full mt-7"

                />
            </View>
        </ScrollView>
        <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  );
}