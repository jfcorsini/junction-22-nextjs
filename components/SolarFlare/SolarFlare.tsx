import React from 'react';
import { Container, Text } from '@chakra-ui/react';

import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('./Another'),
  { ssr: false }
)


export const SolarFlare = () => {
  return (
    <Container display="flex" alignItems="center" justifyContent="center">
      <DynamicComponentWithNoSSR />
    </Container>)
}