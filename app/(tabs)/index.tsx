import { useState } from 'react';
import { Pressable, Text, View, ViewStyle } from 'react-native';
import {
  BotMessageSquare,
  CatIcon,
  CircleCheckBig,
  LockOpenIcon,
} from 'lucide-react-native';
import Animted, {
  FadeInDown,
  FadeInLeft,
  FadeOutLeft,
  FadeOutUp,
  interpolateColor,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  ZoomIn,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);

const _buttonHeight = 50;
const _spacing = 16;

const _activeColor = '#d2d';
// gray hex color
const _inactiveColor = '#fff';

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

interface StepProps {
  active: boolean;
}

const Step: React.FC<StepProps> = ({ active }) => {
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

interface PaginationProps {
  steps: number;
  activeStep: number;
}
const Pagination: React.FC<PaginationProps> = ({ steps, activeStep }) => {
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

const Data = [
  {
    step: 1,
    title: 'Step 1',
  },
  {
    step: 2,
    title: 'Step 2',
  },
  {
    step: 3,
    title: 'Step 3',
  },
];
export default function HomeScreen() {
  const [seletedStep, setSeletedStep] = useState(0);

  const isBackButtonVisible = seletedStep > 0;
  const isLastStep = seletedStep === Data.length - 1;

  const Container = ({ children }: React.PropsWithChildren) => {
    return (
      <Animated.View
        entering={FadeInLeft.springify().stiffness(200).damping(18)}
      >
        {children}
      </Animated.View>
    );
  };

  const SelectedIcon = () => {
    if (seletedStep === 0) {
      return (
        <Container>
          <BotMessageSquare size={60} color={'#d13d'} />
        </Container>
      );
    }
    if (seletedStep === 1) {
      return (
        <Container>
          <CatIcon size={60} color={'#d13d'} />
        </Container>
      );
    }

    return (
      <Container>
        <LockOpenIcon size={60} color={'#d13d'} />
      </Container>
    );
  };

  return (
    <Animted.View
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 30,
        marginHorizontal: 16,
        paddingTop: 80,
      }}
    >
      <Pagination steps={Data.length} activeStep={seletedStep} />
      <Animated.View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: _spacing,
        }}
      >
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          {Data[seletedStep].title}
        </Text>
        <SelectedIcon />
      </Animated.View>
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
