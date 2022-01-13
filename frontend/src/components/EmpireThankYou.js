import React from 'react'
import StarDestroyer1 from '../img/sd1.png';
import StarDestroyer2 from '../img/sd2.png';
import StarDestroyer3 from '../img/sd3.png';
import StarDestroyer4 from '../img/sd4.png';
import TieFighterSmall from '../img/tfsmall.png';
import TieFighterMedium from '../img/tfmedium.png';
import TieFighterLarge from '../img/tflarge.png';
import Empire from '../img/empire.png';

const EmpireThankYou = () => {
    return (
      <>
        <div id='empire-container'>
          <div id='moon' />
          <div id='stars'>
            <div className='stars' />
            <div className='rstars' />
          </div>
          <div id='ships' data-tilt data-tilt-max={4}>
            <div className='ships'>
              <img
                id='sd3'
                src={StarDestroyer3}
                alt='Imperial Star Destroyer'
              />
              <img
                id='sd4'
                src={StarDestroyer4}
                alt='Imperial Star Destroyer'
              />
              <img
                id='sd1'
                src={StarDestroyer1}
                alt='Imperial Star Destroyer'
              />
              <img
                id='sd2'
                src={StarDestroyer2}
                alt='Imperial Star Destroyer'
              />
              {/* <img
                id='ship'
                src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/108463/ship.png'
                alt='ship'
              /> */}
            </div>
            <div className='ships ties'>
              <img
                id='tie1'
                src={TieFighterMedium}
                alt='Imperial Tie-Fighter'
              />
              <img id='tie2' src={TieFighterLarge} alt='Imperial Tie-Fighter' />
              <img
                id='tie3'
                src={TieFighterSmall}
                alt='Imperial Tie-Fighter'
              />
            </div>
          </div>
          <div id='message'>
            <img
              src={Empire}
              alt='Empire'
            />
            <h1 className='rb'>The Empire Thanks You</h1>
          </div>
        </div>
      </>
    );
}

export default EmpireThankYou
