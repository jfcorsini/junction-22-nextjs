import Particles from "react-particles";
import React, { useCallback } from 'react';
import { loadFireflyPreset } from "tsparticles-preset-firefly";
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
            // preset: "firefly",
            preset: "stars",
            detectRetina: true,
            // interactivity: {
            //     events: {
            //         onClick: {
            //             enable: true,
            //             mode: "push",
            //         },
            //         onHover: {
            //             enable: true,
            //             mode: "repulse",
            //         },
            //         resize: true,
            //     },
            //     modes: {
            //         push: {
            //             quantity: 4,
            //         },
            //         repulse: {
            //             distance: 200,
            //             duration: 0.4,
            //         },
            //     },
            // },
            // particles: {
            //     color: {
            //         value: "#ffffff",
            //     },
            //     links: {
            //         color: "#ffffff",
            //         distance: 150,
            //         enable: true,
            //         opacity: 0.5,
            //         width: 1,
            //     },
            //     collisions: {
            //         enable: true,
            //     },
            //     move: {
            //         directions: "none",
            //         enable: true,
            //         outModes: {
            //             default: "bounce",
            //         },
            //         random: false,
            //         speed: 6,
            //         straight: false,
            //     },
            //     number: {
            //         density: {
            //             enable: true,
            //             area: 800,
            //         },
            //         value: 80,
            //     },
            //     opacity: {
            //         value: 0.5,
            //     },
            //     shape: {
            //         type: "circle",
            //     },
            //     size: {
            //         value: { min: 1, max: 5 },
            //     },
            // },
        }}
      />
    </Box>
  );
}