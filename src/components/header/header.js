/* @flow */
import {Text, View, TouchableOpacity, StatusBar} from 'react-native';
import React from 'react';
import styles from './header.styles';
import Router from '../router/router';
import getTopPadding, {onHeightChange} from './header__top-padding';

const TOUCH_PADDING = 8;

type Props = {
  onBack?: () => void,
  onRightButtonClick?: () => any,
  leftButton?: ?ReactElement<any>,
  rightButton?: ?ReactElement<any>,
  children?: ReactElement<any>
}

export default class Header extends React.Component {
  props: Props;

  static defaultProps = {
    onRightButtonClick: () => {},
  };

  componentDidMount() {
    onHeightChange(() => this.forceUpdate());
  }

  onBack() {
    if (this.props.onBack) {
      return this.props.onBack();
    }
    return Router.pop();
  }

  onRightButtonClick() {
    if (this.props.onRightButtonClick) {
      return this.props.onRightButtonClick();
    }
  }

  render() {
    const {leftButton, children, rightButton} = this.props;

    return (
      <View style={[styles.header, {paddingTop: getTopPadding()}]}>
        <StatusBar animated barStyle="light-content"/>

        <TouchableOpacity
          hitSlop={{top: TOUCH_PADDING, left: TOUCH_PADDING, bottom: TOUCH_PADDING, right: TOUCH_PADDING}}
          style={[styles.headerButton, styles.headerButtonLeft]}
          onPress={() => this.onBack()}>
          <Text style={styles.headerButtonText}>{leftButton}</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>{children}</View>

        <TouchableOpacity
          hitSlop={{top: TOUCH_PADDING, left: TOUCH_PADDING, bottom: TOUCH_PADDING, right: TOUCH_PADDING}}
          style={[styles.headerButton, styles.headerButtonRight]}
          onPress={this.onRightButtonClick.bind(this)}>
          <Text style={[styles.headerButtonText]}>{rightButton}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
