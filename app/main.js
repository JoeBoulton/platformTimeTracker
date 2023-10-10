import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import ParticleComponent from '../components/shared/ParticleComponent';
import TimerComponent from '../components/shared/TimerComponent';
import TravelTimeComponent from '../components/shared/TravelTimeComponent';
import moment from 'moment';
import PrimaryButton from '../components/shared/PrimaryButton';

const formatTime = (label, seconds) => {
  const duration = moment.duration(seconds, 'seconds');
  const hours = String(duration.hours()).padStart(2, '0');
  const minutes = String(duration.minutes()).padStart(2, '0');
  return `${hours}:${minutes}:${
    label === 'Total Elapsed Time' ? seconds : '00'
  }`;
};

const splitTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  const seconds = totalSeconds % 60;
  return { hours, minutes, seconds };
};

const TimeDisplay = ({ label, time }) => (
  <Text>
    {label}: {formatTime(label, time)}
  </Text>
);

const Main = () => {
  const [step, setStep] = useState(0);
  const [initialTravelTime, setInitialTravelTime] = useState(0);
  const [timerStartEnd, setTimerStartEnd] = useState({
    totalElapsedSeconds: 0,
  });
  const [returnTravelTime, setReturnTravelTime] = useState(0);

  const handleTimeChange = (type, value) => {
    if (type === 'Initial') setInitialTravelTime(value);
    if (type === 'Return') setReturnTravelTime(value);
    if (type === 'Elapsed') setTimerStartEnd({ totalElapsedSeconds: value });
  };
  console.log(returnTravelTime);
  const handleTimer = (start, end, totalElapsedSeconds) => {
    setTimerStartEnd({ start, end, totalElapsedSeconds });
    setStep(2);
  };

  const handleSubmit = () => {
    // Your submit logic here
  };
  // Function to handle TextInput changes for times
  const handleFinalTimeChange = (type, key, value) => {
    // Limit the maximum hours to 12
    // console.log(type, key, value);
    // if(type==='')
    // if (type === 'Initial') setInitialTravelTime(totalSeconds / 60);
    // if (type === 'Return') setReturnTravelTime(totalSeconds / 60);
  };

  const allValuesSet = initialTravelTime && returnTravelTime;

  return (
    <View className="flex flex-1 mx-2">
      <ParticleComponent />
      <View className="flex-1 space-y-4">
        <View className="p-4">
          {!allValuesSet && (
            <>
              <TimeDisplay
                label="Initial Travel Time"
                time={initialTravelTime * 60 * 60}
              />
              <TimeDisplay
                label="Total Elapsed Time"
                time={timerStartEnd.totalElapsedSeconds}
              />
              <TimeDisplay
                label="Return Travel Time"
                time={returnTravelTime * 60 * 60}
              />
            </>
          )}
        </View>
        <View className="flex flex-1 bg-white/90 mx-5 shadow-md rounded-md justify-center pb-10 items-center">
          {allValuesSet ? (
            <View className="flex flex-col items-center">
              {['Initial', 'Elapsed', 'Return'].map((type) => {
                const time =
                  type === 'Initial'
                    ? initialTravelTime * 60 * 60
                    : type === 'Return'
                    ? returnTravelTime * 60 * 60
                    : timerStartEnd.totalElapsedSeconds;
                const { hours, minutes, seconds } = splitTime(time);

                return (
                  <View
                    key={type}
                    className="flex-row justify-center items-center space-x-2 mb-2"
                  >
                    <Text className="text-lg font-semibold">{`${type} Travel Time:`}</Text>
                    <View className="flex-row p-2">
                      <Text className="text-lg">{String(hours)}</Text>

                      <Text className="text-lg">:</Text>
                      <Text className="text-lg">{String(minutes)}</Text>

                      <Text className="text-lg">:</Text>
                      <Text className="text-lg">{String(seconds)}</Text>
                    </View>
                  </View>
                );
              })}
              <PrimaryButton text="Submit" onPress={handleSubmit} />
            </View>
          ) : (
            <>
              {step === 0 && (
                <TravelTimeComponent
                  type="Initial"
                  updateMainState={(value) => {
                    setInitialTravelTime(value / 60);
                    setStep(1);
                  }}
                />
              )}
              {step === 1 && <TimerComponent handleTimer={handleTimer} />}
              {step === 2 && (
                <TravelTimeComponent
                  type="Return"
                  updateMainState={(value) => {
                    setReturnTravelTime(value / 60);
                    setStep(3);
                  }}
                />
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default Main;
