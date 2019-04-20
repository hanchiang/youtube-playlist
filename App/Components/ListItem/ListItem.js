import React from 'react'
import PropTypes from 'prop-types'
import { ListItem } from 'react-native-elements'

import styles from './Style.js'

export default class MyListItem extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    rightTitle: PropTypes.string,
    rightSubtitle: PropTypes.string,
    containerStyle: PropTypes.object,
    contentContainerStyle: PropTypes.object,
    rightContentContainerStyle: PropTypes.object,
    leftAvatar: PropTypes.object,
    badge: PropTypes.object
  }

  static defaultProps = {
    containerStyle: {},
    contentContainerStyle: {},
    rightContentContainerStyle: {},
    leftAvatar: {},
    badge: {}
  }

  render() {
    return (
      <ListItem
        title={this.props.title}
        titleStyle={[styles.titleStyle]}
        subtitle={this.props.subtitle}
        rightTitle={this.props.rightTitle}
        rightTitleStyle={[styles.rightTitleStyle]}
        rightSubtitleStyle={[styles.rightSubtitleStyle]}
        rightSubtitle={this.props.rightSubtitle}
        containerStyle={[styles.containerStyle, this.props.containerStyle]}
        contentContainerStyle={[styles.contentContainerStyle, this.props.contentContainerStyle]}
        rightContentContainerStyle={[styles.rightContentContainerStyle, this.props.rightContentContainerStyle]}
        leftAvatar={{
          rounded: true,
          badStyles: styles.leftAvatar,
          ...this.props.leftAvatar
        }}
        badge={{
          badStyle: styles.badge,
          ...this.props.badge
        }}
      />
    )
  }
}
