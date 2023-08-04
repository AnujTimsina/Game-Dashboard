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
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { TRANSACTION_TYPES } from 'src/interfaces';
import { IUserFormatted } from 'src/interfaces/user';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUserFormatted;
}

export default function RechargeModal({ isOpen, onClose, user }: IModalProps) {
  const toast = useToast();
  // const { ToastContainer, toast } = createStandaloneToast();

  const { userName } = useSelector((state: RootState) => state.gameUser);

  const validateSchema = Yup.object().shape({
    rechargeBalance: Yup.number()
      .required('This field is required')
      .test(
        'Is positive?',
        'The number must be greater than 0.',
        (value) => value > 0
      ),
  });

  console.log(user, 'user');
  const createRechargeTransactionMutation = usePost<
    {
      actionBy: string;
      actionTo: string;
      amount: number;
      type: number;
    },
    any
  >(`${BACKEND_URL}${apiRoutes.transactions}`);

  const rechargeUser = async (amount: string) => {
    const data = {
      actionBy: userName,
      actionTo: user.userName,
      amount: amount,
      type: TRANSACTION_TYPES.RECHARGE,
    };

    const result = await createRechargeTransactionMutation.mutateAsync(data);
    console.log(result, 'result');
    onClose();
    toast({
      title: 'Success.',
      description: 'User Recharged Successfully.',
      status: 'success',
      duration: 6000,
      isClosable: true,
      position: 'top',
      // variant={}
      // variant={""}
      // styleConfig={{te}}
      // colorScheme={{"whiteAlpha"}}
    });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent bg={'modalBg'} color={'modalText'} borderRadius={'10px'}>
        <Formik
          initialValues={{
            account: user.userName,
            customerBalance: user.balance,
            availableBalance: '0',
            rechargeBalance: '',
          }}
          validationSchema={validateSchema}
          onSubmit={async (values) => {
            await rechargeUser(values.rechargeBalance);
          }}
        >
          {(formik) => (
            <Form>
              <ModalHeader
                fontSize={'1.125rem'}
                fontWeight={'700'}
                boxShadow={'0px 4px 18px 0px rgba(0, 0, 0, 0.15)'}
              >
                RECHARGE
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
                        // variant="filled"
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
                        htmlFor="customerBalance"
                        fontFamily={'Open Sans'}
                        color="modalText"
                        fontSize="0.875rem"
                        fontWeight=" 600"
                      >
                        Customer Balance
                      </FormLabel>
                      <Input
                        id="customerBalance"
                        name="customerBalance"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.customerBalance}
                        border="1px solid rgba(30, 30, 30, 0.35)"
                        _hover={{ border: '1px solid blue.500' }}
                        isDisabled
                      />
                      {formik.errors.customerBalance && (
                        <Text variant={'error'}>
                          {formik.errors.customerBalance}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        htmlFor="availableBalance"
                        fontFamily={'Open Sans'}
                        color="modalText"
                        fontSize="0.875rem"
                        fontWeight=" 600"
                      >
                        Available Balance
                      </FormLabel>
                      <Input
                        id="availableBalance"
                        name="availableBalance"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.availableBalance}
                        border="1px solid rgba(30, 30, 30, 0.35)"
                        _hover={{ border: '1px solid blue.500' }}
                        isDisabled
                      />
                      {formik.errors.availableBalance && (
                        <Text variant={'error'}>
                          {formik.errors.availableBalance}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel
                        htmlFor="rechargeBalance"
                        fontFamily={'Open Sans'}
                        color="modalText"
                        fontSize="0.875rem"
                        fontWeight=" 600"
                      >
                        Recharge Balance
                      </FormLabel>
                      <Input
                        id="rechargeBalance"
                        name="rechargeBalance"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.rechargeBalance}
                        border="1px solid rgba(30, 30, 30, 0.35)"
                        _hover={{ border: '1px solid blue.500' }}
                      />
                      {formik.errors.rechargeBalance && (
                        <Text variant={'error'}>
                          {formik.errors.rechargeBalance}
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
              >
                <Button onClick={onClose} color={'blueBg'}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  bg={'blueBg'}
                  _hover={{ color: 'none' }}
                  disabled={formik.isSubmitting}
                  isLoading={createRechargeTransactionMutation.isLoading}
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
