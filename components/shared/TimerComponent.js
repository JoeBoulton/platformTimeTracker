import { View, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import React, { useState, useEffect } from 'react';
import SecondaryButton from './SecondaryButton';
import PrimaryButton from './PrimaryButton';

const TimerComponent = ({ handleTimer }) => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [timer, setTimer] = useState(null);

  const maxTimeInSeconds = 43200; // 12 hours in seconds

  useEffect(() => {
    let localTimer = null;
    if (startTime) {
      localTimer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      setTimer(localTimer);
    }

    return () => {
      if (localTimer) clearInterval(localTimer);
    };
  }, [startTime]);

  const handleStart = () => {
    const now = new Date();
    setStartTime(now);
    setCurrentTime(now);
  };

  const handleStop = () => {
    setEndTime(new Date());
    clearInterval(timer);

    const totalElapsedSeconds = calculateTotalTime();
    handleTimer(startTime, new Date(), totalElapsedSeconds); // Pass total time back to Main

    setStartTime(null);
    setCurrentTime(null);
    setEndTime(null);
  };

  const calculateTotalTime = () => {
    if (startTime) {
      const totalElapsedMilliseconds = new Date() - startTime;
      console.log('mili', totalElapsedMilliseconds);
      const totalElapsedSeconds = Math.floor(totalElapsedMilliseconds / 1000);

      console.log(totalElapsedSeconds);
      return totalElapsedSeconds;
    }
    return null;
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
    <>
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
              startTime ? (elapsedTimeInSeconds / maxTimeInSeconds) * 100 : 0
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
    </>
  );
};

export default TimerComponent;
