import { useState } from 'react';
import { Text, View } from 'react-native';
import {
  BotMessageSquare,
  CatIcon,
  CircleCheckBig,
  LockOpenIcon,
} from 'lucide-react-native';
import Animted, {
  FadeInDown,
  FadeOutUp,
  LinearTransition,
  ZoomIn,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { _spacing } from '@/constants/utils';
import { AnimatedButton } from '@/components/AnimatedButton';
import { Pagination } from '@/components/Paginator';
import { Data } from '@/constants/data';
import { Container } from '@/components/IconContainer';

export default function HomeScreen() {
  const [seletedStep, setSeletedStep] = useState(0);

  const isBackButtonVisible = seletedStep > 0;
  const isLastStep = seletedStep === Data.length - 1;

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
