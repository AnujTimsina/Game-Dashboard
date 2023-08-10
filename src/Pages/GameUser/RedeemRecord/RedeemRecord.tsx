import React, { useState } from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Switch,
  Text,
  VStack,
  useBreakpointValue,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import {
  AddUser,
  DropdownIcon,
  ResetIcon,
  SearchIcon2,
} from 'src/assets/images';
import Footer from 'src/Pages/ProfitReport/Footer';
import { RootState } from 'src/store';
import { useSelector } from 'react-redux';
import { createColumnHelper } from '@tanstack/react-table';
import { IMobileTransaction, Transaction } from 'src/interfaces/transaction';
import { useGetUserTransactions } from 'src/api/user';
import { TRANSACTION_TYPES } from 'src/config/constants';
import { TransactionTable } from 'src/components/TransactionTable/TransactionTable';

export default function RedeemRecord() {
  const { id: userId } = useSelector((state: RootState) => state.gameUser);

  const columnHelper = createColumnHelper<Transaction>();

  const columns = [
    columnHelper.accessor('id', {
      cell: (info) => (
        <Text color={'yellowBg'} title={info.getValue()}>
          {`${info.getValue().slice(0, 16)}...`}{' '}
        </Text>
      ),
      header: 'ID',
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor('amount', {
      cell: (info) => info.getValue(),
      header: 'Amount',
    }),
    columnHelper.accessor('actionTo.agentName', {
      cell: (info) => info.getValue(),
      header: 'Receiver Agent Name',
    }),
    columnHelper.accessor('actionToBeforeBalance', {
      cell: (info) => info.getValue(),
      header: 'Receiver Balance Before',
    }),
    columnHelper.accessor('actionToAfterBalance', {
      cell: (info) => info.getValue(),
      header: 'Receiver Balance After',
    }),
    columnHelper.accessor('actionTo.role', {
      cell: (info) => info.getValue(),
      header: 'Receiver Role',
    }),
  ];
  const [page, setpage] = useState(1);

  const {
    data: transactions,
    isLoading,
    isFetching,
  } = useGetUserTransactions(userId, page, TRANSACTION_TYPES.REDEEM);

  const mobileTransactions: IMobileTransaction[] | undefined =
    transactions?.results.map((item) => {
      return {
        id: {
          header: 'ID',
          value: (
            <Text color={'yellowBg'} title={item.id}>
              {' '}
              {`${item.id.slice(0, 6)}...`}{' '}
            </Text>
          ),
        },

        amount: {
          header: 'Amount',
          value: item.amount,
        },
        receiver_agent_name: {
          header: 'Receiver Agent Name',
          value: item.actionTo.agentName,
        },
        receiver_balance: {
          header: 'Receiver Balance',
          value: item.actionTo.balance,
        },
        receiver_role: {
          header: 'Receiver Role',
          value: item.actionTo.role,
        },
      };
    });

  return (
    <VStack gap={0} w={'100%'} h={'100vh'} justify={'space-between'}>
      <VStack
        w={'100%'}
        h={'100vh'}
        bg={'cardBg'}
        p={{ base: '15px 20px ' }}
        borderTopRadius={'10px'}
      >
        <Stack
          w={'100%'}
          borderRadius={'10px'}
          p={{ base: '1rem 0.5rem', lg: '1rem 1.5rem' }}
          background="searchBg"
          boxShadow={
            '0px 4px 4px 0px rgba(0, 0, 0, 0.35), 0px 4px 4px 0px rgba(255, 255, 255, 0.25) inset, 0px 4px 0px 0px rgba(0, 0, 0, 0.35)'
          }
          justify={'space-between'}
          gap={'1rem'}
          flexDir={{ base: 'column', lg: 'row' }}
          align={'center'}
        >
          <Stack
            gap={{ base: '0.4rem', lg: '1rem' }}
            w={'100%'}
            flexDir={{ base: 'row', lg: 'row' }}
            order={{ base: '2', lg: '1' }}
            justify={'space-between'}
          >
            <HStack gap={'1rem'} justify={'space-between'} w={'100%'}>
              <Text w={'100%'} display={{ base: 'none', lg: 'block' }}>
                Date Range
              </Text>
              <Input
                type="date"
                color={'white'}
                placeholder="Auto Date range"
                _placeholder={{ color: 'white' }}
                border={'none'}
                boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25), 0px 2px 2px 0px rgba(0, 0, 0, 0.25) inset"
                p={'10px'}
              />
              <Text display={{ base: 'none', lg: 'block' }}>To</Text>
              <Input
                type="date"
                color={'white'}
                placeholder="Auto Date range"
                _placeholder={{ color: 'white' }}
                border={'none'}
                boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25), 0px 2px 2px 0px rgba(0, 0, 0, 0.25) inset"
                p={'10px'}
                display={{ base: 'none', lg: 'block' }}
                //   w={{ lg: '240px' }}
              />
            </HStack>
            <Menu>
              <MenuButton
                px={4}
                py={2}
                transition="2s ease-in"
                borderRadius="md"
                _hover={{ bg: 'gray.400' }}
                _expanded={{ bg: 'gray.400' }}
                _focus={{ boxShadow: 'outline' }}
                boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25), 0px 2px 2px 0px rgba(0, 0, 0, 0.25) inset"
                w={'240px'}
              >
                <HStack w={'100%'} justify={'space-between'}>
                  <Text>Search By Account</Text>
                  <DropdownIcon />
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem>Yesterday</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
          <Stack
            flexDir={['row', 'row', 'row']}
            order={{ base: '1', lg: '2' }}
            justify={'space-between'}
            w={'100%'}
          >
            <Input
              type="text"
              color={'white'}
              placeholder="Please enter your search content"
              _placeholder={{ color: 'placeHolder' }}
              border={'none'}
              boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25), 0px 2px 2px 0px rgba(0, 0, 0, 0.25) inset"
              p={'10px'}
              //   w={'100%'}
            />
            <Box
              bg={'searchBg'}
              boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25), 0px 2px 2px 0px rgba(0, 0, 0, 0.25) inset"
              p={{ base: '10px', md: '10px', lg: '10px' }}
              borderRadius={'10px'}
              cursor={'pointer'}
            >
              <SearchIcon2 />
            </Box>
            <Box
              bg={'searchBg'}
              boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25), 0px 2px 2px 0px rgba(0, 0, 0, 0.25) inset"
              p={{ base: '10px', md: '10px', lg: '10px' }}
              borderRadius={'10px'}
              cursor={'pointer'}
            >
              <ResetIcon />
            </Box>
          </Stack>
        </Stack>
        <Box w={'100%'}>
          {isLoading ? (
            <Flex w={'100%'} justify={'center'} align={'center'} h={'400px'}>
              <Spinner />
            </Flex>
          ) : (
            transactions &&
            mobileTransactions && (
              <TransactionTable
                columns={columns}
                transactions={transactions.results}
                mobileData={mobileTransactions}
              />
            )
          )}
        </Box>
      </VStack>
      <Footer page={page} setpage={setpage} />
    </VStack>
  );
}
