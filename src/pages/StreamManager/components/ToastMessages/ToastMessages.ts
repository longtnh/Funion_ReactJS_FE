import { UseToastOptions } from '@chakra-ui/toast'

const CLOSE_TIME = 5000

export const TOAST_STREAM_PUBLISHED: UseToastOptions = {
  title: 'Start stream success!',
  description: 'Your stream started successfully',
  position: 'top-left',
  status: 'success',
  duration: CLOSE_TIME,
  isClosable: true,
}

export const TOAST_STREAM_FINISHED: UseToastOptions = {
  title: 'Stream finished',
  description: 'Your stream finished successfully',
  position: 'top-left',
  status: 'info',
  duration: CLOSE_TIME,
  isClosable: true,
}

export const TOAST_STREAM_PUBLISH_FAIL: UseToastOptions = {
  title: 'Start stream fail!',
  description: 'Your stream start fail',
  position: 'top-left',
  status: 'error',
  duration: CLOSE_TIME,
  isClosable: true,
}
