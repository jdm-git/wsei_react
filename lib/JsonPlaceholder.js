import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList, Image, Box} from 'react-native'

export default function AllPosts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await resp.json();
    setData(data);
    setLoading(false);
  };

  const renderItem = ({ item }) => {
    return (
      <Box px={5} py={2} rounded="md" bg="primary.300" my={2}>
        {item.title}
      </Box>
    );
  };
  
  }