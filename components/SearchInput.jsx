import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, {useState} from 'react'

import { icons } from '../constants'
import { usePathname, router } from 'expo-router'

const SearchInput = ({ initialQuery }) => {
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || "");
  return (
      <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
        <TextInput 
            className="text-base m5-0.5 text-white flex-1 font-pregular"
            value={query}
            placeholder="Szukaj postu"
            placeholderTextColor="#CDCDE0"
            onChangeText={(e) => setQuery(e)}
        />
        
        <TouchableOpacity
            onPress={() => {
                if(!query){
                    return Alert.alert("Puste zapytanie", "Wprowadź wyrażenie w pole wyszukiwania")
                }

                if(pathname.startsWith('/search')) router.setParams({ query })
                    else router.push(`/search/${query}`)
            }}
        >
            <Image 
                source={icons.search}
                className="w-5 h-5"
                resizeMode='contain'
            />
        </TouchableOpacity>
      </View>
  )
}

export default SearchInput