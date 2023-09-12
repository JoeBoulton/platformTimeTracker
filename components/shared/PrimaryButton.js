import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';

const PrimaryButton = ({ loading, handleSubmit, text }) => {
  return (
    <View className="flex flex-row w-[80%] justify-between ">
      <TouchableOpacity
        onPress={handleSubmit}
        className={`${
          loading ? 'bg-gray-400' : 'bg-[#d4af37]'
        } p-3 rounded-md flex-1 items-center flex flex-row justify-center space-x-2`}
        disabled={loading}
      >
        <Text className="font-medium text-lg text-white">
          {loading ? 'Loading...' : { text }}
        </Text>
        {loading && <ActivityIndicator color="#000" />}
      </TouchableOpacity>
    </View>
  );
};

export default PrimaryButton;
