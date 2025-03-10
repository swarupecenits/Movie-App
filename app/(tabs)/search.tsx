import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import { fetchMovies } from '@/services/api'
import useFetch from '@/services/useFetch'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'

const Search = () => {

  const [searchQuery, setSearchQuery] = useState('')

  const {
    data: movies,
    loading,
    error,
  } = useFetch(() => fetchMovies({ query: searchQuery }), true);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode='cover' />
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieCard
            {...item}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 20,
          paddingRight: 5,
          marginVertical: 16
        }}
        className="px-5"
        contentContainerStyle={{
          paddingBottom: 100
        }}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row mt-20 justify-center'>
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className='my-5'>
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className='text-red-500 px-5 my-3'>Error: {error.message}</Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length! > 0 && (
              <Text className='text-xl text-white text-bold'>
                Search Results for {' '}
                <Text className='text-accent'>{searchQuery}</Text>
              </Text>
            )}
          </>
        }
      />
    </View>
  )
}

export default Search