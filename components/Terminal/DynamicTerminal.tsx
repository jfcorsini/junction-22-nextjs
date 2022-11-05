import React from 'react';
import { Container, Text } from '@chakra-ui/react';

import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('./Terminal'),
  { ssr: false }
)


export const Terminal = () => {
  return (
    <Container display="flex" alignItems="center" justifyContent="center">
      <DynamicComponentWithNoSSR />
    </Container>)
}