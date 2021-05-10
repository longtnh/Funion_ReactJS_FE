import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  FormLabel,
  FormControl,
  VStack,
  Input,
  Flex,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { COLOR } from '@/constants/styles'
import React, { useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import RequiredField from '@/components/Form/RequiredField/RequiredField'
import 'react-datepicker/dist/react-datepicker.css'
import '../../css/date-picker.css'
import { useDispatch } from 'react-redux'
import AsyncSelect from 'react-select/async'
import { SearchCategories } from '@/services/SearchService'
import moment from 'moment'
import { createEventAdmin } from '../adminEvent.thunk'

const EventModal = props => {
  const dispatch = useDispatch()
  const { register, handleSubmit, control } = useForm()
  const bgSelect = useColorModeValue('#fff', '#1a202c')
  const bgOptionSelect = useColorModeValue('#fff', '#2d3748')
  const borderSelect = useColorModeValue('#e2e8f0', '#3f444e')

  const reactSelectStyles = {
    control: base => ({
      ...base,
      background: bgSelect,
      borderColor: borderSelect,
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? '#cecece' : bgOptionSelect,
    }),
  }

  const handleSearchCategory = useCallback(inputValue => SearchCategories(inputValue), [])

  const onSubmit = data => {
    return dispatch(
      createEventAdmin(
        data.eventName,
        data.category.value,
        moment(data.startDate).format('YYYY-MM-DD HH:mm'),
        moment(data.endDate).format('YYYY-MM-DD HH:mm'),
        data.logoImage[0],
      ),
    )
  }
  return (
    <Modal size="xl" isOpen={props.isOpen} onClose={props.onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <VStack alignItems="left">
              <Text textAlign="center" fontSize="2xl">
                Add Event
              </Text>
              <form>
                <FormControl>
                  <FormLabel>
                    <RequiredField>Event Name</RequiredField>
                  </FormLabel>
                  <Input
                    type="text"
                    name="eventName"
                    placeholder="Event Name"
                    ref={register({
                      required: 'This input is required.',
                    })}
                  />
                </FormControl>
                <FormControl mt={3}>
                  <FormLabel>
                    <RequiredField>Logo Image</RequiredField>
                  </FormLabel>
                  <Flex>
                    <input type="file" ref={register} name="logoImage" />
                  </Flex>
                </FormControl>
                <FormControl>
                  <FormLabel>
                    <RequiredField>Category :</RequiredField>
                  </FormLabel>
                  <Controller
                    name="category"
                    defaultValue=""
                    control={control}
                    render={({ onChange, value }) => (
                      <AsyncSelect
                        placeholder="Search Category..."
                        styles={reactSelectStyles}
                        onChange={selected => onChange(selected ? selected : '')}
                        isSearchable
                        isClearable
                        cacheOptions
                        defaultOptions
                        loadOptions={handleSearchCategory}
                      />
                    )}
                    rules={{ required: 'This input is required.' }}
                  />
                </FormControl>
                <HStack mt={3}>
                  <FormControl>
                    <FormLabel>
                      <RequiredField>Start Date</RequiredField>
                    </FormLabel>
                    <Controller
                      name="startDate"
                      ref={register}
                      control={control}
                      render={({ onChange, value }) => (
                        <DatePicker
                          dateFormat="dd/MM/yyyy HH:mm"
                          selected={value}
                          onChange={onChange}
                          showMonthDropdown
                          showYearDropdown
                          timeInputLabel="Time:"
                          dropdownMode="select"
                          showTimeInput
                        />
                      )}
                      rules={{ required: 'This input is required.' }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>
                      <RequiredField>End Date</RequiredField>
                    </FormLabel>
                    <Controller
                      name="endDate"
                      ref={register}
                      control={control}
                      render={({ onChange, value }) => (
                        <DatePicker
                          dateFormat="dd/MM/yyyy HH:mm"
                          selected={value}
                          onChange={onChange}
                          showMonthDropdown
                          showYearDropdown
                          timeInputLabel="Time:"
                          dropdownMode="select"
                          showTimeInput
                        />
                      )}
                      rules={{ required: 'This input is required.' }}
                    />
                  </FormControl>
                </HStack>
              </form>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              background={COLOR.SECONDARY}
              color="white"
              mr={3}
              onClick={() => props.onClose()}
            >
              Add
            </Button>
            <Button
              colorScheme="gray"
              color={COLOR.PRIMARY}
              onClick={() => props.onClose()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}

export default React.memo(EventModal)
