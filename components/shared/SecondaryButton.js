import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';

const PrimaryButton = ({ loading, onPress, text }) => {
  return (
    <View className="flex flex-row w-[80%] justify-between ">
      <TouchableOpacity
        onPress={onPress}
        className={`${
          loading ? 'bg-gray-800' : 'bg-[#000]'
        } p-3 rounded-md flex-1 items-center flex flex-row justify-center space-x-2`}
        disabled={loading}
      >
        <Text className="font-medium text-lg text-white">
          {loading ? 'Loading...' : `${text}`}
        </Text>
        {loading && <ActivityIndicator color="#fff" />}
      </TouchableOpacity>
    </View>
  );
};

export default PrimaryButton;
