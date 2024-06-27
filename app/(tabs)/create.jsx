import { useState } from "react";
import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import FormField from "../../components/FormField";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import * as DocumentPicker from "expo-document-picker";

const Create = () => {

  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    image: null,
    thumbnail: null,
    prompt: ''
  })

  // const requestOptions = {
  //       method: 'POST', 
  //       headers: { 'Content-Type': 'application/json' }, 
  //       body: JSON.stringify({ 
  //         title: form.title,
  //         url: form.image.uri,
  //         thumbnailUrl: form.thumbnail.uri,
  //         id: '1',
  //         albumId: '1'
  //       }) 
  // }

  const openPicker = async (type) => {
    const result = await DocumentPicker.getDocumentAsync({type: ['image/png', 'image/jpg']})

    if(!result.canceled){
      if(type === 'image')
        setForm({ ...form, image: result.assets[0] })
      if(type === 'thumbnail')
        setForm({ ...form, thumbnail: result.assets[0] })
    }else{
      setTimeout(()=>{
        Alert.alert('Dokument wybrany', JSON.stringify(result, null, 2))
      }, 100)
    }
  }
  const submit = async () => {
    Alert.alert("Funkcja niedostępna (JSON placeholder)")
    // try {
    //   await fetch(
    //     'https://jsonplaceholder.typicode.com/photos', requestOptions
    //   ).then(response => {
    //     response.json()
    //     .then(data => {
    //       Alert.alert("Post dodany: ", data.createdAt)
    //     });
    //   })
    // } catch (error) {
    //   throw new Error(error)
    // }
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Prześlij zdjęcie
        </Text>
        <FormField 
          title="Nazwa pliku"
          value={form.title}
          placeholder="Tytuł zdjęcia"
          handleChangeText={(e) => setForm({ ...form, title: e})}
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Prześlij zdjęcie
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.image ? (
              <Image 
                source={{uri: form.image.uri}}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
              
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary justify-center items-center">
                <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )
          
          }
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail
          </Text>

          <TouchableOpacity onPress={() => openPicker("thumbnail")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <CustomButton 
          title="Wyślij"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create