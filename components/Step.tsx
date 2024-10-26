import React from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import { _activeColor, _inactiveColor, _spacing } from '@/constants/utils';

interface StepProps {
  active: boolean;
}

export const Step: React.FC<StepProps> = ({ active }) => {
  const animatedValue = useDerivedValue(() => {
    return withSpring(active ? 1 : 0);
  });

  const animatedBgStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animatedValue.value,
        [0, 1],
        [_inactiveColor, _activeColor, _inactiveColor]
      ),
    };
  });

  const animatedWidtStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(active ? _spacing * 4 : _spacing * 2),
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: _spacing * 1.2,
          borderRadius: 10,
        },
        animatedWidtStyle,
        animatedBgStyle,
      ]}
    />
  );
};
