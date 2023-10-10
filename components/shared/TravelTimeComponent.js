import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import PrimaryButton from './PrimaryButton';
import InputComponent from './InputComponent';

// TravelTimeComponent.js
const TravelTimeComponent = ({ type, updateMainState }) => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

  const handleUpdate = () => {
    const totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);
    updateMainState(totalMinutes); // Update the state in the parent component.
  };

  // Check whether both hours and minutes have values
  const isValid = hours !== '' && minutes !== '';

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex flex-col items-center w-full">
        <Text className="text-xl font-semibold mb-5">{`Enter ${type} Travel Time`}</Text>
        <InputComponent
          text="Hours"
          type="numeric"
          onChange={(text) => setHours(text)}
        />
        <InputComponent
          text="Minutes"
          type="numeric"
          onChange={(text) => setMinutes(text)}
        />
        <PrimaryButton
          onPress={handleUpdate}
          text="Submit"
          disabled={!isValid}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TravelTimeComponent;
