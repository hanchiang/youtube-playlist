import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Theme'

export default StyleSheet.create({
  titleStyle: {
    fontSize: Fonts.size.regular,
    color: Colors.black
  },
  rightTitleStyle: {
    fontSize: 12
  },
  rightSubtitleStyle: {
    fontSize: 12
  },
  containerStyle: {
    paddingLeft: 5,
    paddingRight: 10,
    paddingVertical: 10
  },
  contentContainerStyle: {
    flex: 3
  },
  rightContentContainerStyle: {
    flex: 3
  },
  leftAvatar: {
    maxWidth: '100%'
  },
  badge: {
    borderRadius: 50,
    padding: 5,
    backgroundColor: Colors.darkGrey,
    height: 'auto' // fix ios padding issue
  },
  badgeContainer: {
    flex: 1.5
  },
  badgeText: {
    
  }
})
