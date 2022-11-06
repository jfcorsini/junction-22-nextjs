import React from 'react';
import { Container } from '@chakra-ui/react';

import dynamic from 'next/dynamic'
import { getMocks, mockData } from '../../utils/mock';
import { useEffectOnce } from '../../utils/hooks';


const DynamicComponentWithNoSSR = dynamic(
  () => import('./dotFlare'),
  { ssr: false }
)

const TimeBar = dynamic(
  () => import('./timeLine'),
  { ssr: false }
)

export const SolarFlare = () => {
  return (
    <Container display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <DynamicComponentWithNoSSR />
      <TimeBar width={300} />
    </Container>)
}
