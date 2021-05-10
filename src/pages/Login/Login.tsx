import React, { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Button,
  IconButton,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Link,
  Divider,
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PATH } from '@/constants/paths'
import ErrorMessage from '@/components/Form/ErrorMessage/ErrorMessage'
import { login, loginByGoogle } from './login.thunk'
import GoogleLogin from 'react-google-login'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useForm } from 'react-hook-form'
import InputErrorMessage from '@/components/Form/InputErrorMessage/InputErrorMessage'
import RequiredField from '@/components/Form/RequiredField/RequiredField'

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { handleSubmit, register, formState, errors } = useForm()
  const [showPassword, setShowPassword] = useState(false)
  const error = useSelector((state: AppState) => state.login.error)
  const isAuthenticated = useSelector((state: AppState) => state.app.isAuthenticated)

  const handlePasswordVisibility = () => setShowPassword(!showPassword)

  const onSubmit = useCallback(
    values => {
      setShowPassword(false)
      return dispatch(login(values))
    },
    [dispatch],
  )

  // turn off show password if login fail
  useEffect(() => {
    setShowPassword(false)
  }, [error])

  // forward to homepage when login success
  useEffect(() => {
    if (isAuthenticated) history.push(PATH.HOME)
  }, [history, isAuthenticated])

  // handle google auth response
  const handleGoogleAuthResponseSuccess = useCallback(
    res => {
      dispatch(loginByGoogle({ externalToken: res.accessToken }))
    },
    [dispatch],
  )

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        w={{ base: '90%', sm: '380px' }}
        mt={32}
        px={8}
        pt={9}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && <ErrorMessage message={error} />}
            <FormControl>
              <RequiredField>Email</RequiredField>
              <Input
                name="email"
                type="email"
                placeholder="user@gmail.com"
                size="lg"
                ref={register({
                  pattern: {
                    value: /^[^@]+@[^@]+\.[^@]+$/i,
                    message: 'Email not match format',
                  },
                  required: 'This input is required.',
                })}
              />
              {errors.email && (
                <InputErrorMessage>{errors.email.message}</InputErrorMessage>
              )}
            </FormControl>
            <FormControl mt={6}>
              <RequiredField>Password</RequiredField>
              <InputGroup>
                <Input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="*******"
                  size="lg"
                  ref={register({ required: 'This input is required.' })}
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
            <Button
              isLoading={formState.isSubmitting}
              variant="outline"
              type="submit"
              width="full"
              mt={4}
            >
              Sign In
            </Button>
          </form>
        </Box>
        <Divider />
        <Text textAlign="center" fontSize="sm" color="gray.400" my={3}>
          - or sign in with -
        </Text>
        <GoogleLogin
          clientId="64056209179-feni2538p3moea4j1nd9q88mr8afd909.apps.googleusercontent.com"
          render={renderProps => (
            <Button
              width="full"
              leftIcon={<FcGoogle />}
              bg="white"
              variant="outline"
              boxShadow="sm"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Sign in with Google
            </Button>
          )}
          buttonText="Login"
          onSuccess={handleGoogleAuthResponseSuccess}
          cookiePolicy={'single_host_origin'}
        />
        <Text textAlign="center" mt={6} mb={5}>
          Don't have account?{'  '}
          <Link color="blue.500" href={PATH.REGISTER}>
            Sign up
          </Link>
        </Text>
      </Box>
    </Flex>
  )
}

export default Login
