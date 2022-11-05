import Particles from "react-particles";
import React, { useCallback } from 'react';
import { loadStarsPreset } from "tsparticles-preset-stars";
import { Engine } from "tsparticles-engine";
import { Box } from "@chakra-ui/react";

export const NightSky = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // await loadFull(engine);
    // await loadFireflyPreset(engine);
    await loadStarsPreset(engine)
}, []);

  return (
    <Box position="absolute">
      <Particles
        height="100vh"
        width="100vw"
        init={particlesInit}
        options={{
          fullScreen: {
            enable: true,
            zIndex: -1,
          },
            background: { color: { value: "#000" } },
            fpsLimit: 120,
            preset: "stars",
            detectRetina: true,
        }}
      />
    </Box>
  );
}