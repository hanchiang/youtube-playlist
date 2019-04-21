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

  getAvatarInitials = () => {
    const wordArray = this.props.title.split(' ')
    const firstLetterArray = wordArray.map(word => word.charAt(0))
    return firstLetterArray.join('').toUpperCase()
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
          size: 'medium',
          avatarStyles: styles.leftAvatar,
          title: this.getAvatarInitials(),
          ...this.props.leftAvatar
        }}
        badge={{
          badgeStyle: styles.badge,
          containerStyle: styles.badgeContainer,
          textStyle: styles.badgeText,
          ...this.props.badge
        }}
      />
    )
  }
}
