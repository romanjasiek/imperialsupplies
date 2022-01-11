import React from 'react'

class BB8 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      droidX: 0,
      mouseX: 0,
      toTheRight: true,
      speed: 2,
      accelMod: 1,
    };
  }

  // Keep track of the mouse position.
  handleMouseMove(event) {
    this.setState({
      mouseX: event.pageX,
    });
  }

  // Speed Mod Bar
  handleSpeedChange(e) {
    if (parseFloat(e.target.value)) {
      this.setState({
        speed: e.target.value,
      });
    }
  }

  // Acceleration Mod Bar
  handleAccelChange(e) {
    if (parseFloat(e.target.value)) {
      this.setState({
        accelMod: e.target.value,
      });
    }
  }

  // Get moving!
  movement() {
    let { droidX, mouseX, speed, accelMod } = this.state;

    // Need a pretty strict if statement to make sure React doesn't end up in a
    // render loop with all the state changes / re-rendering going on.
    if (Math.abs(Math.round(droidX) - mouseX) !== 1) {
      let distance = mouseX - droidX;
      let acceleration = Math.abs(distance * accelMod) / 100;

      // Move to the right
      if (droidX < mouseX) {
        this.setState({
          droidX: droidX + speed * acceleration,
          toTheRight: true,
        });
      }

      // Move to the left
      else {
        this.setState({
          droidX: droidX - speed * acceleration,
          toTheRight: false,
        });
      }
    }
  }

  // Get some initial movement on first mount.
  componentWillMount() {
    this.setState({
      mouseX: 300,
    });
  }

  // Set up the mouse event listener and fire up the movement function.
  componentDidMount() {
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    setInterval(this.movement.bind(this), 1);
  }

  // Clean up.
  componentWillUnmount() {
    document.removeEventListener('mousemove', (e) => this.handleMouseMove(e));
  }

  // Away we go.
  render() {
    let { speed, accelMod, droidX, mouseX, toTheRight } = this.state;

    return /*#__PURE__*/ React.createElement(
      'div',
      null /*#__PURE__*/,

      //   React.createElement(
      //     'div',
      //     { className: 'logo' } /*#__PURE__*/,
      //     React.createElement('img', { src: 'http://i68.tinypic.com/iod6yh.png' })
      //   ) /*#__PURE__*/,

      React.createElement(
        'div',
        { className: 'config' } /*#__PURE__*/,
        React.createElement(
          'div',
          { className: 'control-wrap' } /*#__PURE__*/,
          React.createElement('p', null, 'Speed: ', speed) /*#__PURE__*/,
          React.createElement('input', {
              className: 'slider',
            type: 'range',
            min: '0',
            max: '11',
            step: '0.1',
            value: speed,
            onChange: this.handleSpeedChange.bind(this),
          })
        ) /*#__PURE__*/,

        React.createElement(
          'div',
          { className: 'control-wrap' } /*#__PURE__*/,
          React.createElement(
            'p',
            null,
            'Acceleration: ',
            accelMod
          ) /*#__PURE__*/,
          React.createElement('input', {
              className: 'slider',
            type: 'range',
            min: '0',
            max: '3',
            step: '0.1',
            value: accelMod,
            onChange: this.handleAccelChange.bind(this),
          })
        )
      ) /*#__PURE__*/,

      React.createElement(
        'div',
        {
          className: 'bb8',
          style: { WebkitTransform: `translateX(${droidX}px)` },
        } /*#__PURE__*/,
        React.createElement(
          'div',
          {
            className: 'antennas ' + (toTheRight ? 'right' : ''),
            style: {
              WebkitTransform: `translateX(${
                (mouseX - droidX) / 25
              }px) rotateZ(${(mouseX - droidX) / 80}deg)`,
            },
          } /*#__PURE__*/,
          React.createElement('div', {
            className: 'antenna short',
          }) /*#__PURE__*/,
          React.createElement('div', { className: 'antenna long' })
        ) /*#__PURE__*/,

        React.createElement(
          'div',
          {
            className: 'head',
            style: {
              WebkitTransform: `translateX(${
                (mouseX - droidX) / 15
              }px) rotateZ(${(mouseX - droidX) / 25}deg)`,
            },
          } /*#__PURE__*/,
          React.createElement('div', { className: 'stripe one' }) /*#__PURE__*/,
          React.createElement('div', { className: 'stripe two' }) /*#__PURE__*/,
          React.createElement(
            'div',
            { className: 'eyes ' + (toTheRight ? 'right' : '') } /*#__PURE__*/,
            React.createElement('div', { className: 'eye one' }) /*#__PURE__*/,
            React.createElement('div', { className: 'eye two' })
          ) /*#__PURE__*/,

          React.createElement(
            'div',
            {
              className: 'stripe detail ' + (toTheRight ? 'right' : ''),
            } /*#__PURE__*/,
            React.createElement('div', {
              className: 'detail zero',
            }) /*#__PURE__*/,
            React.createElement('div', {
              className: 'detail zero',
            }) /*#__PURE__*/,
            React.createElement('div', {
              className: 'detail one',
            }) /*#__PURE__*/,
            React.createElement('div', {
              className: 'detail two',
            }) /*#__PURE__*/,
            React.createElement('div', {
              className: 'detail three',
            }) /*#__PURE__*/,
            React.createElement('div', {
              className: 'detail four',
            }) /*#__PURE__*/,
            React.createElement('div', {
              className: 'detail five',
            }) /*#__PURE__*/,
            React.createElement('div', { className: 'detail five' })
          ) /*#__PURE__*/,

          React.createElement('div', { className: 'stripe three' })
        ) /*#__PURE__*/,

        React.createElement(
          'div',
          {
            className: 'ball',
            style: { WebkitTransform: `rotateZ(${droidX / 2}deg)` },
          } /*#__PURE__*/,
          React.createElement('div', { className: 'lines one' }) /*#__PURE__*/,
          React.createElement('div', { className: 'lines two' }) /*#__PURE__*/,
          React.createElement('div', { className: 'ring one' }) /*#__PURE__*/,
          React.createElement('div', { className: 'ring two' }) /*#__PURE__*/,
          React.createElement('div', { className: 'ring three' })
        ) /*#__PURE__*/,

        React.createElement('div', { className: 'shadow' })
      ) /*#__PURE__*/,

      React.createElement(
        'div',
        { className: 'instructions' } /*#__PURE__*/,
        React.createElement('p', null, 'Copyright © 2022 Imperial Supplies')
      )
    );
  }
}

export default BB8;

// ReactDOM.render(
//   /*#__PURE__*/ React.createElement(App, null),
//   document.getElementById('app')
// );
