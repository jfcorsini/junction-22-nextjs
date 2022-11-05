import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react';
import { MyParticles } from '../components/MyParticles';

export default function Home() {

return (
  <Box position="relative" overflow="hidden" >
    <Box position="absolute">
      <MyParticles />
    </Box>
  
    <Flex
      alignItems="center"
      justifyContent="center"
      position="relative"
      zIndex="1"  
      height="100vh"
      width="100vw">
      <Text color="#FFF" fontSize="4xl" letterSpacing="widest" fontStyle="oblique">
        CONSTELLATION
      </Text>
    </Flex>
  </Box>    
);
}
