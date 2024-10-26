import React from 'react';
import { Pressable, ViewStyle } from 'react-native';
import Animated, {
  FadeInLeft,
  FadeOutLeft,
  LinearTransition,
} from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);

const _buttonHeight = 50;

interface AnimatedButtonProps extends React.PropsWithChildren {
  style: ViewStyle;
  onPress: () => void;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  style,
  onPress,
  children,
}) => {
  return (
    <AnimatedTouchable
      onPress={onPress}
      style={[
        {
          height: _buttonHeight,
          width: 150,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 230,
        },
        style,
      ]}
      entering={FadeInLeft.springify().stiffness(200).damping(18)}
      exiting={FadeOutLeft.springify().stiffness(200).damping(18)}
      layout={LinearTransition.springify().stiffness(200).damping(18)}
    >
      {children}
    </AnimatedTouchable>
  );
};
