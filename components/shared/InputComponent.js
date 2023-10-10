import { View, Text, TextInput } from 'react-native';
import React from 'react';

const InputComponent = ({ text, onChange, type }) => {
  return (
    <View className="w-full items-center justify-center mb-4">
      <View className="w-[80%]">
        <Text className="text-black text-2xl font-light mb-2">{text}</Text>
      </View>
      <TextInput
        className="bg-gray-200 border text-black w-[80%] px-2 py-2 rounded-md text-lg"
        style={{ lineHeight: 25 }}
        onChangeText={onChange}
        keyboardType={type}
        secureTextEntry={type === 'password'}
      />
    </View>
  );
};
export default InputComponent;
