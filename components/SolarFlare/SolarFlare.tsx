import React, { useEffect } from 'react';
import { Container, Text } from '@chakra-ui/react';

import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('./dotFlare'),
  { ssr: false }
)


export const SolarFlare = () => {
  var intensities = [0.2, 0.1, 0.25, 0.1, 1, 0.6]
  useEffect(() => {
    const interval = setInterval(() => {
      if (intensities[0] != 0)
      intensities = [0, 0, 0, 0, 0, 0]
      else
      intensities = [0.2, 0.1, 0.4, 0.8, 1, 0.6]
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container display="flex" alignItems="center" justifyContent="center">
      <DynamicComponentWithNoSSR getIntensities={() => {return intensities}} />
    </Container>)
}
