// eslint-disable-next-line react-hooks/rules-of-hooks
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Button,
  Text,
} from '@chakra-ui/react'
import { BsApp } from 'react-icons/bs'
import Cropper from 'react-easy-crop'
import { COLOR } from '@/constants/styles'
import { getCroppedImg } from '@/utils/canvasUtils'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateAvatar } from '../../profileedit.thunk'

const ModalProfile = props => {
  const dispatch = useDispatch()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const resetCrop = () => {
    setCrop({ x: 0, y: 0 })
    setZoom(1)
  }

  const onCloseCropModal = () => {
    resetCrop()
    props.onClose()
  }

  const completeCropImage = useCallback(async () => {
    const croppedImage = (await getCroppedImg(props.imageSrc, croppedAreaPixels)) as any
    resetCrop()
    const blobToFile = await fetch(croppedImage)
      .then(r => r.blob())
      .then(blobFile => new File([blobFile], 'imageCrop.jpg', { type: blobFile.type }))

    dispatch(updateAvatar(blobToFile))

    //test log base 64 image
    const reader = new FileReader()
    reader.readAsDataURL(blobToFile)
    reader.onloadend = () => {
      console.log(reader.result as string)
    }

    props.onSubmit()
    props.onClose()
  }, [props, croppedAreaPixels, dispatch])

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  return (
    <Modal size="2xl" isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Box position="relative" width="full" height={600} backgroundColor="white">
            <Cropper
              image={props.imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </Box>
          <Box display="flex" flexDirection="column" alignItems="stretch" p={5}>
            <Box display="flex" flex="1" alignItems="center" mr={5}>
              <Text fontSize="lg" color={COLOR.PRIMARY} mr={10} fontWeight="semibold">
                Zoom
              </Text>
              <Slider
                aria-label="slider-ex-2"
                onChange={val => setZoom(val)}
                min={1}
                max={3}
                step={0.1}
                size="lg"
                defaultValue={0}
                colorScheme="pink"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb>
                  <Box color={COLOR.PRIMARY} as={BsApp} />
                </SliderThumb>
              </Slider>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            background={COLOR.SECONDARY}
            color="white"
            mr={3}
            onClick={completeCropImage}
          >
            Update
          </Button>
          <Button colorScheme="gray" onClick={onCloseCropModal} color={COLOR.PRIMARY}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default React.memo(ModalProfile)
