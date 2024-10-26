import { _spacing } from '@/constants/utils';
import React from 'react';
import { Animated, View } from 'react-native';
import { Step } from './Step';

interface PaginationProps {
  steps: number;
  activeStep: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  steps,
  activeStep,
}) => {
  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        gap: _spacing,
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: _spacing,
          paddingVertical: _spacing / 2,
          paddingHorizontal: _spacing * 2,
          borderRadius: _spacing * 2,
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}
      >
        {Array.from({ length: steps }).map((_, index) => (
          <Step key={index} active={index === activeStep} />
        ))}
      </View>
    </Animated.View>
  );
};
