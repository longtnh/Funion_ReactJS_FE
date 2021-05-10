import React, { useCallback, useEffect, useState, useRef } from 'react'
import {
  Box,
  Button,
  IconButton,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Link,
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PATH } from '@/constants/paths'
import ErrorMessage from '@/components/Form/ErrorMessage/ErrorMessage'
import SuccessMessageRegister from '@/components/Form/SuccessMessageRegister/SuccessMessageRegister'
import { registerAccount } from './register.thunks'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useForm } from 'react-hook-form'

const InputErrorMessage = ({ children }) => (
  <Text mt={2} ml={1} color="tomato">
    {'⚠ '}
    {children}
  </Text>
)

const Register = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { handleSubmit, register, formState, errors, watch } = useForm()

  // Validate password
  const password = useRef({})
  password.current = watch('password', '')

  const [showPassword, setShowPassword] = useState(false)
  const [showRetypePassword, setShowRetypePassword] = useState(false)
  const error = useSelector((state: AppState) => state.register.error)
  const messSuccess = useSelector((state: AppState) => state.register.mess)
  const isAuthenticated = useSelector((state: AppState) => state.app.isAuthenticated)

  const onSubmit = useCallback(
    values => {
      setShowPassword(false)
      setShowRetypePassword(false)
      dispatch(
        registerAccount(
          values.email,
          values.password,
          values.retypePassword,
          values.username,
        ),
      )
    },
    [dispatch],
  )

  useEffect(() => {
    setShowPassword(false)
    setShowRetypePassword(false)
  }, [error, messSuccess])

  // forward to homepage when login success
  useEffect(() => {
    if (isAuthenticated) history.push(PATH.HOME)
  }, [history, isAuthenticated])

  const handlePasswordVisibility = () => setShowPassword(!showPassword)
  const handleRetypePasswordVisibility = () => setShowRetypePassword(!showRetypePassword)

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        mt={32}
        px={8}
        pt={9}
        pb={2}
        w={{ base: '90%', sm: '380px' }}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>Register</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && <ErrorMessage message={error} />}
            {messSuccess && <SuccessMessageRegister />}
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="text"
                placeholder="123@abc.com"
                size="lg"
                ref={register({
                  pattern: {
                    value: /^[^@]+@[^@]+\.[^@]+$/i,
                    message: 'Email not match format',
                  },
                })}
              />
              {errors.email && (
                <InputErrorMessage>{errors.email.message}</InputErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="*******"
                  size="lg"
                  ref={register({
                    minLength: {
                      value: 8,
                      message: 'Password must have at least 8 characters',
                    },
                  })}
                />
                <InputRightElement width={10} m={1}>
                  <IconButton
                    aria-label=""
                    h="1.75rem"
                    size="md"
                    variant="ghost"
                    _focus={{}}
                    onClick={handlePasswordVisibility}
                    icon={showPassword ? <FaEye /> : <FaEyeSlash />}
                  />
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <InputErrorMessage>{errors.password.message}</InputErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Retype Password</FormLabel>
              <InputGroup>
                <Input
                  name="retypePassword"
                  type={showRetypePassword ? 'text' : 'password'}
                  placeholder="*******"
                  size="lg"
                  ref={register({
                    validate: value =>
                      value === password.current || 'The passwords do not match',
                  })}
                />
                <InputRightElement width={10} m={1}>
                  <IconButton
                    aria-label=""
                    h="1.75rem"
                    size="md"
                    variant="ghost"
                    _focus={{}}
                    onClick={handleRetypePasswordVisibility}
                    icon={showRetypePassword ? <FaEye /> : <FaEyeSlash />}
                  />
                </InputRightElement>
              </InputGroup>
              {errors.retypePassword && (
                <InputErrorMessage>{errors.retypePassword.message}</InputErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input name="username" type="text" size="lg" ref={register()} />
            </FormControl>
            <Button
              width="full"
              isLoading={formState.isSubmitting}
              variant="outline"
              type="submit"
              mt={5}
            >
              Create Account
            </Button>
          </form>
        </Box>
        <Text textAlign="center" mt={3} mb={5}>
          Already have account?{'  '}
          <Link color="blue.500" href={PATH.LOGIN}>
            Sign in
          </Link>
        </Text>
      </Box>
    </Flex>
  )
}

export default Register
