import { useFormik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { useState } from 'react';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddUserModal({ isOpen, onClose }: IModalProps) {
  const [rechargeAuthorized, setrechargeAuthorized] = useState('1');
  const [redeemAuthorized, setredeemAuthorized] = useState('1');
  const [activeStatus, setactiveStatus] = useState('2');

  const validateSchema = Yup.object().shape({
    firstName: Yup.string().required('This field is required'),
    lastName: Yup.string().notRequired(),
    email: Yup.string()
      .email('Please enter a valid email')
      .required('This field is required'),
    password: Yup.string()
      .required('This field is required')
      .min(8, 'Pasword must be 8 or more characters')
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])\w+/,
        'Password ahould contain at least one uppercase and lowercase character'
      )
      .matches(/\d/, 'Password should contain at least one number')
      .matches(
        /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
        'Password should contain at least one special character'
      ),
    // confirmPassword: Yup.string().when("password", (password, field) => {
    //   if (password) {
    //     return field.required("The passwords do not match").oneOf([Yup.ref("password")], "The passwords do not match");
    //   }
    // }),
  });

  // const formik = useFormik({
  //   initialValues: {
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //   },
  //   validationSchema: validateSchema,
  //   onSubmit: (values, { resetForm }) => {
  //     console.log(values);
  //     setLoading(true);
  //     setTimeout(() => {
  //       setLoading(false);
  //       resetForm();
  //     }, 1000 * 2);
  //   },
  // });

  const formik = useFormik({
    initialValues: {
      agentName: '',
      password: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      size={{ base: '2xl', lg: '4xl' }}
    >
      <ModalOverlay />
      <ModalContent bg={'modalBg'} color={'modalText'} borderRadius={'10px'}>
        <ModalHeader
          fontSize={'1.125rem'}
          fontWeight={'700'}
          boxShadow={'0px 4px 18px 0px rgba(0, 0, 0, 0.15)'}
        >
          ADD USER
        </ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody
          boxShadow="0px 2px 9px 0px rgba(0, 0, 0, 0.15)"
          p={{ lg: '20px 14px 0px 14px' }}
        >
          {/* <Flex align="center" justify="center" w={'100%'}> */}
          <Box p={'22px'} rounded="md">
            <form onSubmit={formik.handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl isRequired>
                  <FormLabel
                    htmlFor="agentName"
                    fontFamily={'Open Sans'}
                    color="modalText"
                    fontSize="0.875rem"
                    fontWeight=" 600"
                  >
                    Agent Name
                  </FormLabel>
                  <Input
                    id="agentName"
                    name="agentName"
                    type="text"
                    // variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.agentName}
                    border="1px solid rgba(30, 30, 30, 0.35)"
                    _hover={{ border: '1px solid blue.500' }}
                  />
                </FormControl>
                <Flex
                  w={'100%'}
                  flexDir={{ base: 'column', lg: 'row' }}
                  gap={'1rem'}
                >
                  <FormControl isRequired>
                    <FormLabel
                      htmlFor="loginAccount"
                      fontFamily={'Open Sans'}
                      color="modalText"
                      fontSize="0.875rem"
                      fontWeight=" 600"
                    >
                      Login Account
                    </FormLabel>
                    <Input
                      id="loginAccount"
                      name="loginAccount"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.agentName}
                      border="1px solid rgba(30, 30, 30, 0.35)"
                      _hover={{ border: '1px solid blue.500' }}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel
                      htmlFor="contactNumber"
                      fontFamily={'Open Sans'}
                      color="modalText"
                      fontSize="0.875rem"
                      fontWeight=" 600"
                    >
                      Contact Number
                    </FormLabel>
                    <Input
                      id="contactNumber"
                      name="contactNumber"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.agentName}
                      border="1px solid rgba(30, 30, 30, 0.35)"
                      _hover={{ border: '1px solid blue.500' }}
                    />
                  </FormControl>
                </Flex>
                <Flex
                  w={'100%'}
                  flexDir={{ base: 'column', lg: 'row' }}
                  gap={'1rem'}
                >
                  {' '}
                  <FormControl isRequired>
                    <FormLabel
                      htmlFor="loginPassword"
                      fontFamily={'Open Sans'}
                      color="modalText"
                      fontSize="0.875rem"
                      fontWeight=" 600"
                    >
                      Login Password
                    </FormLabel>
                    <Input
                      id="loginPassword"
                      name="loginPassword"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.agentName}
                      border="1px solid rgba(30, 30, 30, 0.35)"
                      _hover={{ border: '1px solid blue.500' }}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel
                      htmlFor="confirmPassword"
                      fontFamily={'Open Sans'}
                      color="modalText"
                      fontSize="0.875rem"
                      fontWeight=" 600"
                    >
                      Confirm Password
                    </FormLabel>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.agentName}
                      border="1px solid rgba(30, 30, 30, 0.35)"
                      _hover={{ border: '1px solid blue.500' }}
                    />
                  </FormControl>
                </Flex>
                <Flex
                  w={'100%'}
                  flexDir={{ base: 'column', lg: 'row' }}
                  gap={'1rem'}
                  justify={'space-between'}
                >
                  <VStack color={'modalText'} w={'100%'} align={'start'}>
                    <Text
                      color={'modalText'}
                      fontFamily={'Open Sans'}
                      fontSize="0.875rem"
                      fontWeight="600"
                    >
                      Recharge permission
                    </Text>
                    <RadioGroup
                      defaultValue={rechargeAuthorized}
                      onChange={(e) => setrechargeAuthorized(e)}
                      value={rechargeAuthorized}
                      border="1px solid rgba(30, 30, 30, 0.10)"
                      p={'5px'}
                    >
                      <Stack
                        spacing={4}
                        direction="row"
                        w={'100%'}
                        justify={'space-evenly'}
                      >
                        {' '}
                        <Radio value="1">
                          <Text
                            fontWeight={600}
                            color={
                              rechargeAuthorized === '1'
                                ? 'blueBg'
                                : 'modalText'
                            }
                          >
                            Unauthorized
                          </Text>
                        </Radio>
                        <Radio value="2">
                          <Text
                            fontWeight={600}
                            color={
                              rechargeAuthorized === '2'
                                ? 'blueBg'
                                : 'modalText'
                            }
                          >
                            Authorized
                          </Text>
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </VStack>
                  <VStack color={'modalText'} w={'100%'} align={'start'}>
                    <Text
                      color={'modalText'}
                      fontFamily={'Open Sans'}
                      fontSize="0.875rem"
                      fontWeight="600"
                    >
                      Redeem permission
                    </Text>
                    <RadioGroup
                      defaultValue={redeemAuthorized}
                      onChange={(e) => setredeemAuthorized(e)}
                      value={redeemAuthorized}
                      border="1px solid rgba(30, 30, 30, 0.10)"
                      p={'5px'}
                    >
                      <Stack
                        spacing={4}
                        direction="row"
                        w={'100%'}
                        justify={'space-evenly'}
                      >
                        {' '}
                        <Radio value="1">
                          <Text
                            fontWeight={600}
                            color={
                              redeemAuthorized === '1' ? 'blueBg' : 'modalText'
                            }
                          >
                            Unauthorized
                          </Text>
                        </Radio>
                        <Radio value="2">
                          <Text
                            fontWeight={600}
                            color={
                              redeemAuthorized === '2' ? 'blueBg' : 'modalText'
                            }
                          >
                            Authorized
                          </Text>
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </VStack>
                  <VStack color={'modalText'} w={'100%'} align={'start'}>
                    <Text
                      color={'modalText'}
                      fontFamily={'Open Sans'}
                      fontSize="0.875rem"
                      fontWeight="600"
                    >
                      Active Status
                    </Text>
                    <RadioGroup
                      defaultValue={activeStatus}
                      onChange={(e) => setactiveStatus(e)}
                      value={activeStatus}
                      border="1px solid rgba(30, 30, 30, 0.10)"
                      p={'5px'}
                    >
                      <Stack
                        spacing={4}
                        direction="row"
                        w={'100%'}
                        justify={'space-evenly'}
                      >
                        <Radio value="1">
                          <Text
                            fontWeight={600}
                            color={
                              activeStatus === '1' ? 'blueBg' : 'modalText'
                            }
                          >
                            Active
                          </Text>
                        </Radio>
                        <Radio value="2">
                          <Text
                            fontWeight={600}
                            color={
                              activeStatus === '2' ? 'blueBg' : 'modalText'
                            }
                          >
                            Disabled
                          </Text>
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </VStack>
                </Flex>
              </VStack>
            </form>
          </Box>
          {/* </Flex> */}
        </ModalBody>
        <ModalFooter
          bg="#F5F5F5"
          boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.15), 0px -2px 2px 0px rgba(0, 0, 0, 0.10)"
        >
          <Button onClick={onClose} color={'blueBg'}>
            Cancel
          </Button>
          <Button
            type="submit"
            bg={'blueBg'}
            _hover={{ color: 'none' }}
            onClick={onClose}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
