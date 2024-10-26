import { useState } from 'react';
import {
  Pressable,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import Animted, {
  FadeInLeft,
  FadeOutLeft,
  LinearTransition,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);

const _buttonHeight = 50;

interface AnimatedButtonProps extends React.PropsWithChildren {
  style: ViewStyle;
  onPress: () => void;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
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

const Data = [
  {
    step: 1,
    title: 'Título 1',
  },
  {
    step: 2,
    title: 'Título 2',
  },
  {
    step: 3,
    title: 'Título 3',
  },
];
export default function HomeScreen() {
  const [seletedStep, setSeletedStep] = useState(0);

  const isBackButtonVisible = seletedStep > 0;

  return (
    <Animted.View
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 30,
        marginHorizontal: 16,
      }}
    >
      <Text>{Data[seletedStep].title}</Text>
      <View>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          {isBackButtonVisible && (
            <AnimatedButton
              style={{ backgroundColor: '#ddd' }}
              onPress={() => {
                setSeletedStep(seletedStep - 1);
              }}
            >
              <Animated.Text
                layout={LinearTransition.springify()
                  .stiffness(2000)
                  .damping(18)}
              >
                Anterior
              </Animated.Text>
            </AnimatedButton>
          )}
          <AnimatedButton
            style={{ backgroundColor: '#d2d', flex: 1 }}
            onPress={() => {
              if (seletedStep === Data.length - 1) {
                return;
              }

              setSeletedStep(seletedStep + 1);
            }}
          >
            <Animated.Text
              layout={LinearTransition.springify().stiffness(200).damping(18)}
            >
              Continuar
            </Animated.Text>
          </AnimatedButton>
        </View>
      </View>
    </Animted.View>
  );
}
