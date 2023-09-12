import { View, Text } from 'react-native';
import React from 'react';
import ParticleComponent from '../components/shared/ParticleComponent';

const main = () => {
  return (
    <View className="flex flex-1 mx-0">
      <ParticleComponent />
      <Text className="text-3xl font-semibold">Welcome Back,</Text>
    </View>
  );
};

export default main;
