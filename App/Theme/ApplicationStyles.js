/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import Metrics from './Metrics'

export default {
  screen: {
    container: {
      flex: 1
    }
  },
  image: {
    logo: {
      maxWidth: 100,
      maxHeight: 100
    }
  },
  button: {
    default: {
      paddingHorizontal: 20,
      paddingVertical: 10
    },
    loading: {
      paddingVertical: 3
    }
  }
}
