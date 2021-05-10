// eslint-disable-next-line react-hooks/rules-of-hooks
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
} from '@chakra-ui/react'
import { COLOR } from '@/constants/styles'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import RequiredField from '@/components/Form/RequiredField/RequiredField'
import 'react-datepicker/dist/react-datepicker.css'
import '../../css/date-picker.css'
import moment from 'moment'
import { addSubEventAdmin } from '../adminSubEvent.thunk'
import { useDispatch } from 'react-redux'

const SubEventModal = props => {
  const dispatch = useDispatch()
  const [status] = useState('NotHappenedYet')
  const { register, handleSubmit, control } = useForm()
  const onSubmit = data => {
    return dispatch(
      addSubEventAdmin(
        props.eventId,
        status,
        moment(data.startTime).format('YYYY-MM-DD HH:mm'),
      ),
    )
  }

  return (
    <Modal size="xl" isOpen={props.isOpen} onClose={props.onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <VStack>
              <Text alignContent="center" fontSize="2xl">
                Add Sub Event
              </Text>
              <form>
                <FormControl>
                  <FormLabel>
                    <RequiredField>Start Time</RequiredField>
                  </FormLabel>
                  <Controller
                    name="startTime"
                    preventFocus={true}
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

export default React.memo(SubEventModal)
