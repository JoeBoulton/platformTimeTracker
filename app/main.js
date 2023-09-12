import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ParticleComponent from '../components/shared/ParticleComponent';
import PrimaryButton from '../components/shared/PrimaryButton';
import SecondaryButton from '../components/shared/SecondaryButton';
import axios from 'axios';

const Main = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [timer, setTimer] = useState(null);

  const maxTimeInSeconds = 43200; // 12 hours in seconds

  useEffect(() => {
    if (startTime) {
      setTimer(
        setInterval(() => {
          setCurrentTime(new Date());
        }, 1000)
      );
    }

    return () => clearInterval(timer);
  }, [startTime]);

  const handleStart = () => {
    const now = new Date();
    setStartTime(now);
    setCurrentTime(now);
  };

  const handleStop = async () => {
    setEndTime(new Date());
    clearInterval(timer);

    try {
      const response = await axios.post('https://mockapi.com/endpoint', {
        startTime,
        endTime: new Date(),
        userId: '12345', // Replace with the actual userId
      });

      console.log('Data submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }

    setStartTime(null);
    setCurrentTime(null);
    setEndTime(null);
  };

  const elapsedTimeInSeconds = startTime
    ? Math.floor((currentTime - startTime) / 1000)
    : 0;

  const formatTime = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  return (
    <View className="flex flex-1 mx-2">
      <ParticleComponent />
      <View className="flex-1 space-y-4">
        <Text className="text-3xl font-semibold">Welcome Back,</Text>
        <View className="flex flex-1 bg-white/90 mx-5 shadow-md rounded-md justify-between pb-10 ">
          <View className="p-4 flex-1">
            <View className="flex flex-row items-center space-x-2">
              <Text className="text-2xl font-semibold">Start Time:</Text>
              <Text className="text-2xl font-light">
                {startTime ? startTime.toLocaleTimeString() : 'TBC'}
              </Text>
            </View>
            <View className="flex flex-row items-center space-x-2">
              <Text className="text-2xl font-semibold">End Time:</Text>
              <Text className="text-2xl font-light">TBC</Text>
            </View>
            <View className="items-center justify-center pt-2 flex-1">
              <AnimatedCircularProgress
                size={250}
                width={12}
                fill={
                  startTime
                    ? (elapsedTimeInSeconds / maxTimeInSeconds) * 100
                    : 0
                }
                tintColor="#d4af37"
                backgroundColor="#000"
                rotation={360}
              >
                {(fill) => (
                  <Text className="text-4xl font-light">
                    {startTime ? formatTime(elapsedTimeInSeconds) : '00:00:00'}
                  </Text>
                )}
              </AnimatedCircularProgress>
            </View>
          </View>
          <View className="justify-center items-center">
            {startTime ? (
              <SecondaryButton text="Stop" onPress={handleStop} />
            ) : (
              <PrimaryButton text="Start Timer" onPress={handleStart} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Main;
