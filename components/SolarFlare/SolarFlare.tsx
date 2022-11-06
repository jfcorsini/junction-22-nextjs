import React from 'react';
import { Container } from '@chakra-ui/react';

import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('./dotFlare'),
  { ssr: false }
)


export const SolarFlare = () => {

  return (
    <Container display="flex" alignItems="center" justifyContent="center">
      <DynamicComponentWithNoSSR />
    </Container>)
}
