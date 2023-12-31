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
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { usePostCreateTransaction } from 'src/api/transactions';
import { TRANSACTION_TYPES } from 'src/config/constants';
import { IUserFormatted } from 'src/interfaces/user';
import { RootState } from 'src/store';
import * as Yup from 'yup';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUserFormatted;
  transactionType: TRANSACTION_TYPES;
}

export default function TransactionModal({
  isOpen,
  onClose,
  user,
  transactionType,
}: IModalProps) {
  const toast = useToast();
  // const { ToastContainer, toast } = createStandaloneToast();

  const { userName, id: userId } = useSelector(
    (state: RootState) => state.gameUser
  );

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
  const {
    mutateAsync: createRechargeTransactionMutation,
    isLoading,
    isError,
    error,
  } = usePostCreateTransaction();

  const rechargeUser = async (amount: string) => {
    const data = {
      actionBy: userId,
      actionTo: user.id,
      amount: amount,
      type: transactionType,
    };

    const result = await createRechargeTransactionMutation(data);
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

  useEffect(() => {
    if (isError)
      toast({
        title: <Text color={'white'}>Error.</Text>,
        description: <Text color={'white'}>{error.message}</Text>,
        status: 'error',
        duration: 6000,
        isClosable: true,
        position: 'top',
      });
  }, [isError]);

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
                {transactionType == TRANSACTION_TYPES.RECHARGE
                  ? 'RECHARGE'
                  : 'REDEEM'}
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
                        {transactionType == TRANSACTION_TYPES.RECHARGE
                          ? 'Recharge Balance'
                          : 'Redeem Balance'}
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
                  isLoading={isLoading}
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
