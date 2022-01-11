import React from 'react';

const Binoculars = () => {
  return (
    <>
      <div className='star-wars-binoculars'>
        <div className='viewport' />
        <div aria-hidden='true' className='tracking' />
        <div aria-hidden='true' className='also-tracking' />
        <div aria-hidden='true' className='center-details' />
        <div aria-hidden='true' className='outline' data-augmented-ui />
        <div
          aria-hidden='true'
          className='boundary-blackout'
          data-augmented-ui
        />
        {/* <a className='red-text' href='http://jane.propjockey.io/'>
          propjockey.io // Jane Ori
        </a> */}
      </div>
    </>
  );
};

export default Binoculars;
