import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { router } from 'expo-router';
import axios from 'axios';

import platformSplash from '../assets/platformOMS.png';
import ParticleComponent from '../components/shared/ParticleComponent';
import PrimaryButton from '../components/shared/PrimaryButton';

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
        keyboardType={type === 'email' ? 'email-address' : 'default'}
        secureTextEntry={type === 'password'}
      />
    </View>
  );
};

const index = () => {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 6000); // 6 seconds

    return () => {
      clearTimeout(splashTimer);
    };
  }, []);
  const handleInputChange = (label, value) => {
    setLoginInfo((prev) => ({
      ...prev,
      [label.toLowerCase()]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      //   const response = await axios.post('https://your-endpoint-here.com', {
      //     loginInfo,
      //   });

      //   if (response.data.success) {
      router.push('/main');
      //   } else {
      //     // handle error here
      //     alert('Error, please try again');
      //   }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="relative flex-1 ">
      <ParticleComponent />
      <View className="flex-1 items-center justify-center">
        <View className="items-start mb-4">
          <Image
            source={platformSplash}
            style={{ resizeMode: 'contain', height: 50 }}
          />
        </View>
        {[
          { label: 'Email', type: 'email' },
          { label: 'Password', type: 'password' },
        ].map((step) => (
          <InputComponent
            key={step.label}
            text={step.label}
            onChange={(value) => handleInputChange(step.label, value)}
            type={step.type}
          />
        ))}
        <PrimaryButton onPress={handleSubmit} text="Login" loading={loading} />
      </View>
    </View>
  );
};

export default index;
