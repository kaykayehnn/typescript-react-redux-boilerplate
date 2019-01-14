import React, { Component } from 'react'
import styles from './fancyCounter.scss'
import Counter from '@Components/Counter'

export interface FancyCounterProps {
}

export interface FancyCounterState {
  value: number
  buttonColor: string
}

export default class FancyCounter extends Component<FancyCounterProps, FancyCounterState> {
  constructor (props) {
    super(props)

    this.state = {
      value: 0,
      buttonColor: this.getRandomColor()
    }

    this.onClick = this.onClick.bind(this)
  }

  getRandomColor (): string {
    return '#' + Math.random().toString(16).slice(2, 8)
  }

  onClick () {
    this.setState({ buttonColor: this.getRandomColor() })
  }

  render () {
    const { value, buttonColor } = this.state

    return <>
      <Counter
        value={value}
        increment={() => this.setState({ value: value + 2 })}
        decrement={() => this.setState({ value: value - 2 })}
        incrementAsync={() => this.setState({ value: value + 1 })} />
      <button
        style={{ color: buttonColor }}
        className={styles.fancyButton}
        onClick={this.onClick}>Change my color!</button>
    </>
  }
}
