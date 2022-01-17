import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const TextScroller = ({ text }) => {
  const [key, setKey] = useState(1);

  const scrolling = useSpring({
    from: { transform: 'translate(60%,0)' },
    to: { transform: 'translate(-60%,0)' },
    config: { duration: 50000, loop: true },
    reset: true,
    //reverse: key % 2 == 0,
    onRest: () => {
      setKey(key + 1);
    },
  });

  return (
    <div className='categoryColor' key={key}>
      <animated.div style={scrolling}>
          {text}</animated.div>
    </div>
  );
};

export default TextScroller;
