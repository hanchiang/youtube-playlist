import {
  CLIENT_ERROR, SERVER_ERROR, TIMEOUT_ERROR, CONNECTION_ERROR,
  NETWORK_ERROR, CANCEL_ERROR
} from 'apisauce'

/**
 *
 * @param {apisauce response} result
 */
export default function ApiErrorTransform(result) {
  let errorMessage = ''
  switch (result.problem) {
    case CLIENT_ERROR:
    case SERVER_ERROR:
      errorMessage = result.data.error.message
      break
    case TIMEOUT_ERROR:
      errorMessage = 'Request timed out'
      break
    case CONNECTION_ERROR:
      errorMessage = 'Unable to connect to server'
      break
    case NETWORK_ERROR:
      errorMessage = 'Network is not available'
      break
    case CANCEL_ERROR:
      errorMessage = 'Request is cancelled'
      break
    default:
      errorMessage = result.data.error.message
  }

  return errorMessage
}
