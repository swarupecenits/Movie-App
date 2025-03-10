import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";


const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    bio: "",
    email: "",
    profilePic: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const storedProfile = await AsyncStorage.getItem("userProfile");
      if (storedProfile) {
        setProfile(JSON.parse(storedProfile));
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  };

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem("userProfile", JSON.stringify(profile));
      Alert.alert("Success", "Profile updated!");
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfile({ ...profile, profilePic: result.assets[0].uri });
    }
  };

  return (
    <LinearGradient colors={["#081020", "#0b003d"]} className="flex-1">
      <View className="flex-1 justify-center items-center px-6">
        
        {/* Glassmorphic Profile Card */}
        <View className="bg-dark-400 backdrop-blur-lg p-6 rounded-2xl shadow-lg w-full max-w-sm">
          
          {/* Profile Picture */}
          <TouchableOpacity onPress={pickImage} className="items-center mb-5">
            <Image
              source={profile.profilePic ? { uri: profile.profilePic } : require("../../assets/images/logo.png")}
              className="w-32 h-32 rounded-full border-4 border-white shadow-md"
            />
            <Text className="text-sm text-gray-300 mt-2">Tap to change</Text>
          </TouchableOpacity>

          {/* Name Input */}
          <TextInput
            className="bg-white/20 text-white p-3 rounded-md w-full mb-3 placeholder-gray-300"
            placeholder="Name"
            placeholderTextColor="#ccc"
            value={profile.name}
            onChangeText={(text) => setProfile({ ...profile, name: text })}
          />

          {/* Username Input */}
          <TextInput
            className="bg-white/20 text-white p-3 rounded-md w-full mb-3 placeholder-gray-300"
            placeholder="Username"
            placeholderTextColor="#ccc"
            value={profile.username}
            onChangeText={(text) => setProfile({ ...profile, username: text })}
          />

          {/* Bio Input */}
          <TextInput
            className="bg-white/20 text-white p-3 rounded-md w-full mb-3 placeholder-gray-300"
            placeholder="Bio"
            placeholderTextColor="#ccc"
            value={profile.bio}
            onChangeText={(text) => setProfile({ ...profile, bio: text })}
          />

          {/* Email Input */}
          <TextInput
            className="bg-white/20 text-white p-3 rounded-md w-full mb-5 placeholder-gray-300"
            placeholder="Email"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
            value={profile.email}
            onChangeText={(text) => setProfile({ ...profile, email: text })}
          />

          {/* Save Profile Button */}
          <TouchableOpacity onPress={saveProfile} className="bg-accent p-4 rounded-full shadow-lg">
            <Text className="text-white text-center text-lg font-bold">Save Profile</Text>
          </TouchableOpacity>

        </View>
      </View>
    </LinearGradient>
  );
};

export default Profile;
