import Animated, { FadeInLeft } from 'react-native-reanimated';

export const Container = ({ children }: React.PropsWithChildren) => {
  return (
    <Animated.View entering={FadeInLeft.springify().stiffness(200).damping(18)}>
      {children}
    </Animated.View>
  );
};
