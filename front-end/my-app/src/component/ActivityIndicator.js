import React from 'react';
import './activityIndicator.css';
import {defaultTheme} from './defaultTheme';

export default class ActivityIndicator extends React.Component {
  render() {
    let {position, size, width, color, theme} = this.props || {};
    let {containerStyle, animationStyle} = theme || defaultTheme;
    containerStyle = {
      ...containerStyle,
    };
    animationStyle = {...animationStyle};
    if (position) {
      containerStyle.position = position;
    }
    if (size === 'small') {
      animationStyle.height = 25;
      animationStyle.width = 25;
      animationStyle.borderWidth = 2;
    } else if (size === 'large') {
      animationStyle.height = 50;
      animationStyle.width = 50;
      animationStyle.borderWidth = 4;
    } else if (typeof size === 'number') {
      animationStyle.width = size;
      animationStyle.height = size;
    }
    if (width) {
      animationStyle.borderWidth = width;
    }
    if (color) {
      animationStyle.borderColor = color;
    }
    return (
      <div style={containerStyle}>
        <div style={{...animationStyle}} />
      </div>
    );
  }
}