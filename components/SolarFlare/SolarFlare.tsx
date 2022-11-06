import React, { useEffect } from 'react';
import { Container, Text } from '@chakra-ui/react';

import dynamic from 'next/dynamic'
import { getMocks } from '../../utils/mock';
import { useEffectOnce } from '../../utils/hooks';

const DynamicComponentWithNoSSR = dynamic(
  () => import('./dotFlare'),
  { ssr: false }
)


export const SolarFlare = () => {
  const mocks = getMocks();
  var intensities = Object.values(mocks.nextMock().intensities)

  useEffectOnce(() => {
    const interval = setInterval(() => {
      intensities = Object.values(mocks.nextMock().intensities)
    }, 4000);
    return () => clearInterval(interval);
  });

  return (
    <Container display="flex" alignItems="center" justifyContent="center">
      <DynamicComponentWithNoSSR getIntensities={() => {return intensities}} />
    </Container>)
}
