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
    flex: 1
  },
  rightContentContainerStyle: {
    flex: 1
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
  badgeText: {
    
  }
})
