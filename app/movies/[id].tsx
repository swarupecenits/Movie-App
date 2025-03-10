import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants/icons";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { useEffect } from "react";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const Details = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  if (loading)
    return (
      <SafeAreaView className="bg-primary flex-1 flex items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Movie Poster */}
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />

          <TouchableOpacity className="absolute bottom-5 right-5 rounded-full size-14 bg-white flex items-center justify-center">
            <Image
              source={icons.play}
              className="w-6 h-7 ml-1"
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>

        {/* Movie Details */}
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-2xl">{movie?.title}</Text>

          {/* Release Year & Runtime */}
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]} •
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>

          {/* Ratings */}
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>

          {/* Overview */}
          <MovieInfo label="Overview" value={movie?.overview} />

          {/* Genres */}
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
          />

          {/* Budget & Revenue */}
          <View className="flex flex-row justify-between w-full mt-5">
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget ?? 0).toLocaleString()} USD`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${(movie?.revenue ?? 0).toLocaleString()} USD`}
            />
          </View>

          {/* Production Companies */}
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies
                ?.map((c) => c.name)
                .join(" • ") || "N/A"
            }
          />

          {/* Spoken Languages */}
          <MovieInfo
            label="Spoken Languages"
            value={
              movie?.spoken_languages
                ?.map((lang) => lang.english_name)
                .join(", ") || "N/A"
            }
          />

          {/* Production Countries */}
          <MovieInfo
            label="Production Countries"
            value={
              movie?.production_countries
                ?.map((country) => country.name)
                .join(", ") || "N/A"
            }
          />

          {/* Status & Tagline */}
          <MovieInfo label="Status" value={movie?.status} />
          <MovieInfo label="Tagline" value={movie?.tagline} />

          {/* IMDb Link */}
          {movie?.imdb_id && (
            <TouchableOpacity
              onPress={() =>
                router.push(`https://www.imdb.com/title/${movie.imdb_id}`)
              }
              className="mt-5 bg-yellow-500 py-2 px-4 rounded-lg"
            >
              <Text className="text-black font-extrabold text-center">
                View on IMDb
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Back Button */}
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;
 