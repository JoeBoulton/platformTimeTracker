import { View, Text, Dimensions, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';

const { width, height } = Dimensions.get('window');
const generateParticle = () => ({
  id: Math.random().toString(),
  position: new Animated.ValueXY({
    x: Math.random() * width,
    y: Math.random() * height,
  }),
  size: Math.random() * 20 + 5,
  type: [
    'filledCircle',
    'outlineCircle',
    'filledSquare',
    'outlineSquare',
    'plusSign',
  ][Math.floor(Math.random() * 5)],
});

const ParticleComponent = () => {
  const [particles, setParticles] = useState(() =>
    Array.from({ length: 25 }, generateParticle)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          const newPosX = Math.random() * width;
          const newPosY = Math.random() * height;
          Animated.timing(particle.position.x, {
            toValue: newPosX,
            duration: 4000,
            useNativeDriver: true,
          }).start();
          Animated.timing(particle.position.y, {
            toValue: newPosY,
            duration: 4000,
            useNativeDriver: true,
          }).start();
          return particle;
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View className="absolute inset-0 z-0 items-center justify-center">
      {particles.map(({ id, position, size, type }) => (
        <Animated.View
          key={id}
          style={[
            {
              width: size,
              height: size,
              position: 'absolute',
              transform: [
                { translateX: position.x },
                { translateY: position.y },
              ],
            },
          ]}
        >
          {type === 'filledCircle' && (
            <View
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: '#d4af37',
              }}
            />
          )}
          {type === 'outlineCircle' && (
            <View
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: 2,
                borderColor: '#d4af37',
              }}
            />
          )}
          {type === 'filledSquare' && (
            <View
              style={{
                width: size,
                height: size,
                backgroundColor: '#d4af37',
              }}
            />
          )}
          {type === 'outlineSquare' && (
            <View
              style={{
                width: size,
                height: size,
                borderWidth: 2,
                borderColor: '#d4af37',
              }}
            />
          )}
          {type === 'plusSign' && (
            <>
              <View
                style={{
                  position: 'absolute',
                  left: size / 2 - 2,
                  top: 0,
                  width: 4,
                  height: size,
                  backgroundColor: '#d4af37',
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  top: size / 2 - 2,
                  width: size,
                  height: 4,
                  backgroundColor: '#d4af37',
                }}
              />
            </>
          )}
        </Animated.View>
      ))}
    </View>
  );
};

export default ParticleComponent;
