import React from 'react'
import { Box, Container, Flex, Hide, Text } from '@chakra-ui/react';
import { NightSky } from '../components/NightSky';
import { SolarFlare } from '../components/SolarFlare';
import { Terminal } from '../components/Terminal';

export default function Home() {

return (
  <Box position="relative" overflow="hidden" >
    <NightSky />
  
    <Box
      position="relative"
      zIndex="1"  
      height="100vh"
      width="100vw">
      <Flex justifyContent="center" mt={2}>
        <Text color="#FFF" fontSize="2xl" letterSpacing="widest" fontStyle="oblique">
          CONSTELLATION
        </Text>
      </Flex>
      <Flex justifyContent="center" mt={2} height="full" pb={20}>
        <SolarFlare />
        <Hide below='md'>
          <Terminal />
        </Hide>
      </Flex>
    </Box>
  </Box>    
);
}
