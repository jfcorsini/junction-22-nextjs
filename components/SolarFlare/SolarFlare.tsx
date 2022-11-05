import React from 'react';
import { Container, Text } from '@chakra-ui/react';

import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('./Sketch'),
  { ssr: false }
)


export const SolarFlare = () => {
  return (
    <Container backgroundColor="#FFF" height="full">
      <DynamicComponentWithNoSSR />
    </Container>)
}