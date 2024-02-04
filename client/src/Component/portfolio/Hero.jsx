// src/components/Hero.js
import React from 'react';
import { useSpring, animated } from 'react-spring';

const Hero = () => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <animated.div style={props} className="bg-blue-500 text-white py-16 text-center">
      <h1 className="text-4xl font-bold">Your Name</h1>
      <p className="mt-2">Web Developer</p>
    </animated.div>
  );
};

export default Hero;
