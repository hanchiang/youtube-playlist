import React from 'react'
import PropTypes from 'prop-types'

import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'

export default class DelayRender extends React.Component {
  static propTypes = {
    bootstrapped: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    delay: PropTypes.number
  }

  static defaultProps = {
    delay: 0
  }

  constructor(props) {
    super(props)

    this.state = {
      timeElasped: 0,
      pastDelay: false
    }

    this.delay = props.delay
    this.timerUpdateInterval = 10

    this.timerId = setInterval(() => {
      this.setState(prevState => {
        const newTimeElapsed = prevState.timeElasped + this.timerUpdateInterval
        return {
          timeElasped: newTimeElapsed,
          pastDelay: newTimeElapsed >= this.delay
        }
      })
    }, this.timerUpdateInterval)
  }

  render() {
    if (this.props.bootstrapped) {
      clearInterval(this.timerId)
      return this.props.children
    } else {
      if (this.state.timeElasped >= this.delay) {
        return <SplashScreen />
      }
    }
  }
}
