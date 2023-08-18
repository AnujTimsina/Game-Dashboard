import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { usePostChangePassword } from 'src/api/auth';
import { IUserFormatted } from 'src/interfaces/user';
import { RootState } from 'src/store';
import * as Yup from 'yup';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUserFormatted;
}

export default function ResetPasswordModal({
  isOpen,
  onClose,
  user,
}: IModalProps) {
  const toast = useToast();
  // const { ToastContainer, toast } = createStandaloneToast();

  const { userName, id: userId } = useSelector(
    (state: RootState) => state.gameUser
  );

  const validateSchema = Yup.object().shape({
    newPassword: Yup.string()
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
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref('newPassword'), null!],
      'Passwords must match'
    ),
  });

  const { mutateAsync: changePasswordMutation, isLoading } =
    usePostChangePassword();

  const passwordHandler = async (newPassword: string) => {
    const data = {
      userId: user.id,
      newPassword: newPassword,
      managerId: userId,
    };

    const result = await changePasswordMutation(data);
    console.log(result, 'result');
    onClose();
    toast({
      title: <Text color={'white'}>Success.</Text>,
      description: <Text color={'white'}>User Recharged Successfully.</Text>,
      status: 'success',
      duration: 6000,
      isClosable: true,
      position: 'top',
    });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent bg={'modalBg'} color={'modalText'} borderRadius={'10px'}>
        <Formik
          initialValues={{
            account: user.userName,
            newPassword: '',
            confirmNewPassword: '',
            userManager: userName,
          }}
          validationSchema={validateSchema}
          onSubmit={async (values) => {
            await passwordHandler(values.newPassword);
          }}
        >
          {(formik) => (
            <Form>
              <ModalHeader
                fontSize={'1.125rem'}
                fontWeight={'700'}
                boxShadow={'0px 4px 18px 0px rgba(0, 0, 0, 0.15)'}
              >
                RESET PASSWORD
              </ModalHeader>
              <ModalBody
                boxShadow="0px 2px 9px 0px rgba(0, 0, 0, 0.15)"
                p={{ lg: '20px 14px 0px 14px' }}
              >
                <Box p={'22px'} rounded="md">
                  <VStack spacing={4} align="flex-start">
                    <FormControl gap={'1rem'}>
                      <FormLabel
                        htmlFor="account"
                        fontFamily={'Open Sans'}
                        color="modalText"
                        fontSize="0.875rem"
                        fontWeight=" 600"
                      >
                        Account
                      </FormLabel>
                      <Input
                        id="account"
                        name="account"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.account}
                        border="1px solid rgba(30, 30, 30, 0.35)"
                        _hover={{ border: '1px solid blue.500' }}
                        isDisabled
                      />
                      {formik.errors.account && (
                        <Text variant={'error'}>{formik.errors.account}</Text>
                      )}
                    </FormControl>

                    <FormControl>
                      <FormLabel
                        htmlFor="newPassword"
                        fontFamily={'Open Sans'}
                        color="modalText"
                        fontSize="0.875rem"
                        fontWeight=" 600"
                      >
                        New Password
                      </FormLabel>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.newPassword}
                        border="1px solid rgba(30, 30, 30, 0.35)"
                        _hover={{ border: '1px solid blue.500' }}
                      />
                      {formik.errors.newPassword && (
                        <Text variant={'error'}>
                          {formik.errors.newPassword}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        htmlFor="confirmNewPassword"
                        fontFamily={'Open Sans'}
                        color="modalText"
                        fontSize="0.875rem"
                        fontWeight=" 600"
                      >
                        Confirm New Password
                      </FormLabel>
                      <Input
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.confirmNewPassword}
                        border="1px solid rgba(30, 30, 30, 0.35)"
                        _hover={{ border: '1px solid blue.500' }}
                      />
                      {formik.errors.confirmNewPassword && (
                        <Text variant={'error'}>
                          {formik.errors.confirmNewPassword}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel
                        htmlFor="userManager"
                        fontFamily={'Open Sans'}
                        color="modalText"
                        fontSize="0.875rem"
                        fontWeight=" 600"
                      >
                        User Manager
                      </FormLabel>
                      <Input
                        id="userManager"
                        name="userManager"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.userManager}
                        border="1px solid rgba(30, 30, 30, 0.35)"
                        _hover={{ border: '1px solid blue.500' }}
                        isDisabled
                      />
                      {formik.errors.userManager && (
                        <Text variant={'error'}>
                          {formik.errors.userManager}
                        </Text>
                      )}
                    </FormControl>
                  </VStack>
                </Box>
              </ModalBody>
              <ModalFooter
                bg="#F5F5F5"
                boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.15), 0px -2px 2px 0px rgba(0, 0, 0, 0.10)"
                borderBottomRadius={'10px'}
                gap={'1rem'}
              >
                <Button onClick={onClose} color={'blueBg'}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  bg={'blueBg'}
                  _hover={{ color: 'none' }}
                  disabled={formik.isSubmitting}
                  isLoading={isLoading}
                  color={'white'}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}
