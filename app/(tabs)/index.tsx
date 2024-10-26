import { useState } from 'react';
import { Pressable, Text, View, ViewStyle } from 'react-native';
import { CircleCheckBig } from 'lucide-react-native';
import Animted, {
  FadeInDown,
  FadeInLeft,
  FadeOutLeft,
  FadeOutUp,
  LinearTransition,
  ZoomIn,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);

const _buttonHeight = 50;
const _spacing = 16;

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
  const isLastStep = seletedStep === Data.length - 1;

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
        <View style={{ flexDirection: 'row', gap: _spacing }}>
          {isBackButtonVisible && (
            <AnimatedButton
              style={{ backgroundColor: '#ddd' }}
              onPress={() => {
                setSeletedStep(seletedStep - 1);
              }}
            >
              <Animated.Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
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
            {isLastStep ? (
              <Animated.View
                entering={FadeInDown.springify().stiffness(200).damping(18)}
                exiting={FadeOutUp.springify().stiffness(200).damping(18)}
                style={{
                  flexDirection: 'row',
                  gap: _spacing / 2,
                  alignItems: 'center',
                }}
              >
                <Animated.View
                  entering={ZoomIn.springify()
                    .stiffness(200)
                    .damping(18)
                    .delay(100)}
                >
                  <CircleCheckBig color={'white'} size={18} />
                </Animated.View>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                >
                  Finalizar
                </Text>
              </Animated.View>
            ) : (
              <Animated.Text
                entering={FadeInDown.springify().stiffness(200).damping(18)}
                exiting={FadeOutUp.springify().stiffness(200).damping(18)}
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
                layout={LinearTransition.springify().stiffness(200).damping(18)}
              >
                Continuar
              </Animated.Text>
            )}
          </AnimatedButton>
        </View>
      </View>
    </Animted.View>
  );
}
