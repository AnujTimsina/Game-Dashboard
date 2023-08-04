import { ErrorMessage, Form, Formik, useFormik } from 'formik';
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
  useToast,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { useState } from 'react';
import { useFetch, usePost } from 'src/utils/reactQuery';
import { BACKEND_URL } from 'src/config/config';
import { apiRoutes } from 'src/routes/pageRoutes';
import { createStandaloneToast } from '@chakra-ui/react';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddUserModal({ isOpen, onClose }: IModalProps) {
  // const toast = useToast()
  const { ToastContainer, toast } = createStandaloneToast();

  const [rechargeAuthorized, setrechargeAuthorized] = useState('1');
  const [redeemAuthorized, setredeemAuthorized] = useState('1');
  const [activeStatus, setactiveStatus] = useState('2');

  // const users = useFetch('http://localhost:3000/v1/users?limit=10&page=1');

  // console.log(users, 'asdfads');

  const validateSchema = Yup.object().shape({
    agentName: Yup.string()
      .required('This field is required')
      .min(8, 'Pasword must be 8 or more characters'),
    loginAccount: Yup.string().notRequired(),
    // contactNumber: Yup.string().required('This field is required'),
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
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null!],
      'Passwords must match'
    ),
  });

  const createUserMutation = usePost<
    {
      userName: string;
      agentName: string;
      password: string;
    },
    any
  >(`${BACKEND_URL}${apiRoutes.addUser}`);

  const addUser = async (
    usermame: string,
    agentName: string,
    password: string
  ) => {
    const data = {
      userName: usermame,
      agentName: agentName,
      password: password,
    };
    const result = await createUserMutation.mutateAsync(data);
    console.log(result, 'result');
    onClose();
    toast({
      title: 'Success.',
      description: 'Created User Successfully.',
      status: 'success',
      duration: 6000,
      isClosable: true,
      position: 'top',
    });
  };

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      size={{ base: '2xl', lg: '4xl' }}
    >
      <ModalOverlay />
      <ModalContent bg={'modalBg'} color={'modalText'} borderRadius={'10px'}>
        <Formik
          initialValues={{
            agentName: '',
            loginAccount: '',
            contactNumber: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validateSchema}
          onSubmit={async (values) => {
            await addUser(
              values.loginAccount,
              values.agentName,
              values.password
            );
          }}
        >
          {(formik) => (
            <Form>
              <ModalHeader
                fontSize={'1.125rem'}
                fontWeight={'700'}
                boxShadow={'0px 4px 18px 0px rgba(0, 0, 0, 0.15)'}
              >
                ADD USER
              </ModalHeader>
              <ModalBody
                boxShadow="0px 2px 9px 0px rgba(0, 0, 0, 0.15)"
                p={{ lg: '20px 14px 0px 14px' }}
              >
                <Box p={'22px'} rounded="md">
                  <VStack spacing={4} align="flex-start">
                    <FormControl isRequired gap={'1rem'}>
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
                      {formik.errors.agentName && (
                        <Text variant={'error'}>{formik.errors.agentName}</Text>
                      )}
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
                          value={formik.values.loginAccount}
                          border="1px solid rgba(30, 30, 30, 0.35)"
                          _hover={{ border: '1px solid blue.500' }}
                        />
                        {formik.errors.loginAccount && (
                          <Text variant={'error'}>
                            {formik.errors.loginAccount}
                          </Text>
                        )}
                      </FormControl>
                      <FormControl>
                        <FormLabel
                          htmlFor="contactNumber"
                          fontFamily={'Open Sans'}
                          color="modalText"
                          fontSize="0.875rem"
                          fontWeight=" 600"
                        >
                          Contact
                        </FormLabel>
                        <Input
                          id="contactNumber"
                          name="contactNumber"
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.contactNumber}
                          border="1px solid rgba(30, 30, 30, 0.35)"
                          _hover={{ border: '1px solid blue.500' }}
                        />
                        {formik.errors.contactNumber && (
                          <Text variant={'error'}>
                            {formik.errors.contactNumber}
                          </Text>
                        )}
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
                          htmlFor="password"
                          fontFamily={'Open Sans'}
                          color="modalText"
                          fontSize="0.875rem"
                          fontWeight=" 600"
                        >
                          Login Password
                        </FormLabel>
                        <Input
                          id="password"
                          name="password"
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          border="1px solid rgba(30, 30, 30, 0.35)"
                          _hover={{ border: '1px solid blue.500' }}
                        />
                        {formik.errors.password && (
                          <Text variant={'error'}>
                            {formik.errors.password}
                          </Text>
                        )}
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
                          value={formik.values.confirmPassword}
                          border="1px solid rgba(30, 30, 30, 0.35)"
                          _hover={{ border: '1px solid blue.500' }}
                        />
                        {formik.errors.confirmPassword && (
                          <Text variant={'error'}>
                            {formik.errors.confirmPassword}
                          </Text>
                        )}
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
                                  redeemAuthorized === '1'
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
                                  redeemAuthorized === '2'
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
                </Box>
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
                  disabled={formik.isSubmitting}
                  isLoading={createUserMutation.isLoading}
                  // onClick={onClose}
                >
                  Save
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}
