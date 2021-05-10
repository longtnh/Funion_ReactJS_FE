/* eslint-disable react-hooks/exhaustive-deps */
import profileBanner from '@/assets/images/profileBanner.png'
import ErrorMessage from '@/components/Form/ErrorMessage/ErrorMessage'
import InputErrorMessage from '@/components/Form/InputErrorMessage/InputErrorMessage'
import RequiredField from '@/components/Form/RequiredField/RequiredField'
import SuccessMessage from '@/components/Form/SuccessMessage/SuccessMessage'
import { COLOR } from '@/constants/styles'
import { getRotatedImage } from '@/utils/canvasUtils'
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import { getOrientation } from 'get-orientation/browser'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import ModalProfile from './components/ModalProfile/ModalProfile'
import {
  getUserProfile,
  // updateAvatar,
  updateBanner,
  updateUserInfo,
} from './profileedit.thunk'

const ProfileEdit = () => {
  const dispatch = useDispatch()

  const { register, handleSubmit, errors } = useForm()
  const { register: registerAvatar, handleSubmit: handleSubmitAvatar } = useForm()
  const { register: registerBanner, handleSubmit: handleSubmitBanner } = useForm()

  const userInfo = useSelector((state: AppState) => state.profileEdit.userInfo)
  const errorMessage = useSelector((state: AppState) => state.profileEdit.errorMessage)
  const infoMessage = useSelector((state: AppState) => state.profileEdit.infoMessage)
  const profileImageFilePath = `${process.env.IDENTITY_ENDPOINT}${userInfo.profile_image}`
  const bannerImageFilePath = `${process.env.IDENTITY_ENDPOINT}${userInfo.banner_image}`

  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isEditing, setIsEditing] = useState(false)

  // Crop image
  const [imageSrc, setImageSrc] = useState<null | any>(null)

  const ORIENTATION_TO_ANGLE = {
    '3': 180,
    '6': 90,
    '8': -90,
  }

  const changeData = e => {
    e.preventDefault()
    setIsEditing(!isEditing)
  }

  // Upload avatar
  const onUploadAvatar = useCallback(
    values => {
      // return dispatch(updateAvatar(values.profile_image[0]))
      const reader = new FileReader()
      reader.readAsDataURL(values.profile_image[0])
      reader.onloadend = () => {
        console.log(reader.result as string)
      }
    },
    [dispatch, userInfo],
  )

  // Update profile info
  const handleFormSubmit = useCallback(
    values => {
      setIsEditing(false)
      return dispatch(updateUserInfo(values.displayName, values.biography, values.gender))
    },
    [dispatch],
  )

  // Upload banner
  const onUploadBanner = useCallback(
    values => {
      return dispatch(updateBanner(values.banner_image[0]))
    },
    [dispatch],
  )

  const onSelectFile = async e => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      let imageDataUrl = await readFile(file)

      const orientation = await getOrientation(file)
      const rotation = ORIENTATION_TO_ANGLE[orientation]
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
      }

      setImageSrc(imageDataUrl)
      onOpen()
    }
  }

  const readFile = file => {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
  }
  return (
    <>
      <Box p={{ base: 3, sm: 6 }}>
        <Text fontSize="5xl" my={1} fontWeight="bold">
          Your Profile
        </Text>
        {infoMessage && <SuccessMessage message={infoMessage} />}
        {errorMessage && <ErrorMessage message={errorMessage} />}

        {/* Profile picture */}
        <Text fontSize="lg" fontWeight="semibold" mt={5}>
          Profile Picture
        </Text>
        <form onSubmit={handleSubmitAvatar(onUploadAvatar)}>
          <Flex
            display={{ base: 'block', md: 'flex' }}
            mt={1}
            p={4}
            borderWidth={1}
            borderRadius="lg"
          >
            <Center flexShrink={0} textAlign={{ base: 'center', md: 'unset' }}>
              <Avatar src={profileImageFilePath} size="xl" onClick={onOpen} />
            </Center>
            <Flex ml={{ sm: 6 }} flexDirection="column" justify="center">
              <Box textAlign={{ base: 'center', md: 'unset' }}>
                <input
                  type="file"
                  ref={registerAvatar}
                  name="profile_image"
                  onChange={onSelectFile}
                />
              </Box>
              <Text>File format: JPEG, PNG, GIF (max 10MB).</Text>
            </Flex>
          </Flex>
        </form>

        {/* Profile banner */}
        <Text fontSize="lg" fontWeight="semibold" mt={5}>
          Profile Banner
        </Text>
        <form onSubmit={handleSubmitBanner(onUploadBanner)}>
          <Box
            display={{ base: 'block', md: 'flex' }}
            mt={1}
            p={4}
            borderWidth={1}
            borderRadius="lg"
          >
            <Center flexShrink={0} textAlign={{ base: 'center', md: 'unset' }}>
              <Image
                src={bannerImageFilePath}
                w={170}
                h={95}
                fallbackSrc={profileBanner}
                textAlign="center"
              />
            </Center>
            <Flex
              ml={{ md: 6 }}
              mt={{ base: 2, md: 0 }}
              flexDirection="column"
              justify="center"
              alignItems={{ base: 'center', md: 'unset' }}
            >
              <input type="file" ref={registerBanner} name="banner_image" />
              <Button
                type="submit"
                mt={1}
                px={5}
                w={24}
                fontSize="sm"
                background={COLOR.SECONDARY}
                color="white"
                _hover={{ color: COLOR.PRIMARY, background: '#E2E8F0' }}
              >
                Update
              </Button>
              <Text>File format: JPEG, PNG, GIF (recommended 1020x570, max 10MB)</Text>
            </Flex>
          </Box>
        </form>

        {/* Profile Information */}
        <form id="profile-form" onSubmit={handleSubmit(handleFormSubmit)}>
          <Input
            type="hidden"
            ref={register}
            defaultValue={userInfo && userInfo.id}
            name="id"
          />
          <Text fontSize="lg" fontWeight="semibold" mt={5}>
            Profile Information
          </Text>
          <Box p={4} borderWidth={1} borderRadius="lg">
            <FormControl>
              <FormLabel>
                <RequiredField>Username</RequiredField>
              </FormLabel>
              <Input
                ref={register}
                fontSize="sm"
                isReadOnly={true}
                px={5}
                name="username"
                defaultValue={userInfo && userInfo.unique_name}
                // background="gray.100"
                cursor="default"
              ></Input>
            </FormControl>
            <Divider mt={5} />
            <FormControl my={2}>
              <FormLabel>
                <RequiredField>Display Name</RequiredField>
              </FormLabel>
              <Input
                ref={register({
                  required: 'This input is required.',
                })}
                fontSize="sm"
                isReadOnly={!isEditing}
                px={5}
                name="displayName"
                defaultValue={userInfo && userInfo.name}
                background={isEditing ? 'white' : 'gray.100'}
              ></Input>
              {errors.displayName && (
                <InputErrorMessage>{errors.displayName.message}</InputErrorMessage>
              )}
            </FormControl>
            <Divider />
            <FormControl my={2}>
              <FormLabel>
                <RequiredField>Gender</RequiredField>
              </FormLabel>
              <RadioGroup name="gender" defaultValue={userInfo && userInfo.gender}>
                <Stack spacing={5} direction="row">
                  <Radio
                    ref={register}
                    isReadOnly={!isEditing}
                    colorScheme="green"
                    value="1"
                  >
                    Male
                  </Radio>
                  <Radio
                    ref={register}
                    isReadOnly={!isEditing}
                    colorScheme="green"
                    value="2"
                  >
                    Female
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <Divider />
            <FormControl my={2}>
              <FormLabel>
                <RequiredField>Biography</RequiredField>
              </FormLabel>
              <Textarea
                ref={register({
                  required: 'This input is required.',
                })}
                fontSize="sm"
                isReadOnly={!isEditing}
                px={5}
                name="biography"
                defaultValue={userInfo && userInfo.biography}
                background={isEditing ? 'white' : 'gray.100'}
                maxLength={300}
              ></Textarea>
              {errors.biography && (
                <InputErrorMessage>{errors.biography.message}</InputErrorMessage>
              )}
            </FormControl>

            <Divider />
            <Box textAlign={{ base: 'center', sm: 'right' }} mt={3}>
              <Button
                type={isEditing ? 'submit' : 'button'}
                fontSize="sm"
                background={COLOR.SECONDARY}
                color="white"
                px={5}
                _hover={{ color: COLOR.PRIMARY, background: '#E2E8F0' }}
                {...(!isEditing && { onClick: changeData })}
              >
                {isEditing ? 'Update Profile' : 'Edit Profile'}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
      <ModalProfile
        onOpen={onOpen}
        isOpen={isOpen}
        imageSrc={imageSrc}
        userId={userInfo && userInfo.id}
        onSubmit={handleSubmitAvatar(onUploadAvatar)}
        onClose={onClose}
      />
    </>
  )
}

export default ProfileEdit
