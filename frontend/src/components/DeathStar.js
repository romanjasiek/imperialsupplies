import React from 'react';

const DeathStar = () => {

    function parallax() {
      var tie = document.getElementById('tie');
      var deathstar = document.getElementById('deathstar');

      tie.style.top = window.pageYOffset / 0.5 + 'px';
      tie.style.left = -(window.pageYOffset / 0.25) + 'px';
      deathstar.style.top = -(window.pageYOffset / 3) + 'px';
      deathstar.style.right = -window.pageYOffset + 'px';
    }

    window.addEventListener('scroll', parallax, false);

  return (
    <div className="paralax-container">
        <div id='deathstar' className='paralax'></div>
        <div id='tie' className='paralax'></div>
    </div>
  );
};

export default DeathStar;
