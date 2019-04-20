import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Theme'

export default StyleSheet.create({
  titleStyle: {
    fontSize: Fonts.size.regular,
    color: Colors.black
  },
  rightTitleStyle: {
    fontSize: 13
  },
  rightSubtitleStyle: {
    fontSize: 13
  },
  containerStyle: {
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  contentContainerStyle: {
    flex: 1
  },
  rightContentContainerStyle: {
    flex: 1
  },
  leftAvatar: {
    maxWidth: '100%',
    height: 'auto'
  },
  badge: {
    borderRadius: 50,
    padding: 5,
    height: 'auto' // fix padding issue
  }
})
