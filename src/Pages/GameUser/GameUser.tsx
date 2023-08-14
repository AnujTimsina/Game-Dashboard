import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  Switch,
  Text,
  VStack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { AddUser, ResetIcon, SearchIcon2 } from 'src/assets/images';
import Footer from '../ProfitReport/Footer';
import { DataTable } from './DataTable';
import { ChevronDownIcon } from '@chakra-ui/icons';
import VerticalTable from './MobileDataTable';
import AddUserModal from './AddUserModal/AddUserModal';
import RechargeModal from '../../components/TransactionModal/TransactionModal';
import { useGetSubUsers } from 'src/api/user';
import { IUser, IUserFormatted } from 'src/interfaces/user';
import EditorMenu from './EditorMenu/EditorMenu';
import { IMobileUserData } from 'src/interfaces';
import { dateFormatter } from 'src/utils/dateFormatter';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { usePostChangeStatus } from 'src/api/auth';

export type GameData = {
  id: JSX.Element;
  status: JSX.Element;
  username: string;
  nickname: string;
  balance: number;
  create_time: string;
  login_times: number;
  last_login_times: string;
  last_login_ip: string;
  operation: JSX.Element;
};

export default function GameUser() {
  const { id: userId } = useSelector((state: RootState) => state.gameUser);

  const {
    isOpen: isOpenAddUser,
    onClose: onCloseAddUser,
    onOpen: onOpenAddUser,
  } = useDisclosure();

  const [page, setpage] = useState(1);

  const { data: gameUsers, isLoading } = useGetSubUsers(userId, page);
  const { mutateAsync: changeStatusMutateAsync } = usePostChangeStatus();

  const columnHelper = createColumnHelper<IUserFormatted>();

  const columns = [
    columnHelper.accessor('id', {
      cell: (info) => (
        <Text color={'yellowBg'} title={info.getValue()}>
          {`${info.getValue().slice(0, 6)}...`}{' '}
        </Text>
      ),
      header: 'ID',
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor('status', {
      cell: (info) => (
        <Switch
          size={{ base: 'sm', lg: 'lg' }}
          variant={'boxy'}
          onChange={(e) => handleChangeStatus(e, info.row.original)}
          isChecked={info.getValue()}
        />
      ),
      header: 'Status',
    }),
    columnHelper.accessor('userName', {
      cell: (info) => info.getValue(),
      header: 'Username',
    }),
    columnHelper.accessor('agentName', {
      cell: (info) => info.getValue(),
      header: 'Agent Name',
    }),
    columnHelper.accessor('balance', {
      cell: (info) => info.getValue(),
      header: 'Balance',
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor('role', {
      cell: (info) => info.getValue(),
      header: 'Role',
    }),
    columnHelper.accessor('loginTimes', {
      cell: (info) => info.getValue(),
      header: 'Login Times',
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor('lastLoginTime', {
      cell: (info) => dateFormatter(Number(info.getValue())),
      header: 'Last Login Times',
    }),
    columnHelper.accessor('lastLogonAddress', {
      cell: (info) => info.getValue(),
      header: 'Last Login IP',
    }),
    columnHelper.accessor('operation', {
      cell: (info) => {
        return (
          <EditorMenu
            selectedValue={info.getValue()}
            user={info.row.original}
          />
        );
      },
      header: 'Operation',
    }),
  ];

  const addUservalue = useBreakpointValue({
    base: <AddUser />,
    lg: 'Add User',
  });

  const handleAddUser = () => {
    onOpenAddUser();
  };

  const handleChangeStatus = async (
    e: React.ChangeEvent<HTMLInputElement>,
    user: IUserFormatted
  ) => {
    const { checked } = e.target;
    const payload = {
      userName: user.userName,
      status: checked,
    };
    const result = await changeStatusMutateAsync(payload);
    console.log(result, 'status');
  };

  const userData: IUserFormatted[] | undefined = gameUsers?.results.map(
    (user) => {
      const { history, manager, ...rest } = user;
      return {
        ...rest,
        operation: 'Editor',
      };
    }
  );

  const mobileUserData: IMobileUserData[] | undefined = userData?.map(
    (item) => {
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
        status: {
          header: 'Status',
          value: (
            <Switch
              size={{ base: 'sm', lg: 'lg' }}
              variant={'boxy'}
              isChecked={item.status}
              onChange={(e) => handleChangeStatus(e, item)}
              // isChecked={item.status}
            />
          ),
        },
        username: {
          header: 'Username',
          value: item.userName,
        },
        agentName: {
          header: 'Agent Name',
          value: item.agentName,
        },
        balance: {
          header: 'Balance',
          value: item.balance,
        },
        role: {
          header: 'Role',
          value: item.role,
        },
        login_times: {
          header: 'Login Times',
          value: item.loginTimes,
        },
        last_login_times: {
          header: 'Last Login Time',
          value: dateFormatter(Number(item.lastLoginTime)),
        },
        last_login_ip: {
          header: 'Last Login IP',
          value: item.lastLogonAddress,
        },
        operation: {
          header: 'Operation',
          value: <EditorMenu selectedValue={item.operation} user={item} />,
        },
      };
    }
  );
  return (
    <VStack gap={0} w={'100%'} h={'100vh'} justify={'space-between'}>
      <Alert size="md" margin={'15px'}>
        <AlertTitle>
          Note: Please request players to exit game lobby before you recharge
          and withdraw
        </AlertTitle>
      </Alert>
      <VStack
        w={'100%'}
        h={'100vh'}
        bg={'cardBg'}
        p={{ base: '15px 20px ' }}
        borderTopRadius={'10px'}
      >
        <HStack
          w={'100%'}
          borderRadius={'10px'}
          p={{ base: '1rem 0.5rem', lg: '1rem 1.5rem' }}
          background="searchBg"
          boxShadow={
            '0px 4px 4px 0px rgba(0, 0, 0, 0.35), 0px 4px 4px 0px rgba(255, 255, 255, 0.25) inset, 0px 4px 0px 0px rgba(0, 0, 0, 0.35)'
          }
          justify={'space-between'}
          gap={'1rem'}
        >
          <Stack
            gap={{ base: '0.4rem', lg: '1rem' }}
            // w={'100%'}
            flexDir={{ base: 'column', lg: 'row' }}
          >
            <HStack gap={'1rem'} justify={'space-between'}>
              <Text>ID</Text>
              <Input
                type="text"
                color={'white'}
                placeholder="Please enter ID"
                _placeholder={{ color: 'placeHolder' }}
                border={'none'}
                boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25), 0px 2px 2px 0px rgba(0, 0, 0, 0.25) inset"
                p={'10px'}
                w={{ lg: '240px' }}
              />
            </HStack>
            <HStack gap={'1rem'} justify={'space-between'}>
              <Text>Username</Text>
              <Input
                type="text"
                color={'white'}
                placeholder="Please enter ID"
                _placeholder={{ color: 'placeHolder' }}
                border={'none'}
                boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25), 0px 2px 2px 0px rgba(0, 0, 0, 0.25) inset"
                p={'10px'}
                w={{ lg: '240px' }}
              />
            </HStack>
            <HStack gap={'1rem'} justify={'space-between'}>
              <Text>Nickname</Text>
              <Input
                type="text"
                color={'white'}
                placeholder="Please enter ID"
                _placeholder={{ color: 'placeHolder' }}
                border={'none'}
                boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25), 0px 2px 2px 0px rgba(0, 0, 0, 0.25) inset"
                p={'10px'}
                w={{ lg: '240px' }}
              />
            </HStack>
          </Stack>
          <Stack flexDir={['column', 'row', 'row']}>
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
            <Button
              bg={'yellowBg'}
              color={'black'}
              borderRadius={'10px'}
              p={{ base: '0rem', md: '10px', lg: '14px' }}
              onClick={handleAddUser}
            >
              {addUservalue}
            </Button>
          </Stack>
        </HStack>
        <Box w={'100%'}>
          {isLoading ? (
            <Flex w={'100%'} justify={'center'} align={'center'} h={'400px'}>
              <Spinner />
            </Flex>
          ) : (
            userData &&
            mobileUserData && (
              <DataTable
                columns={columns}
                // data={data}
                userData={userData}
                mobileData={mobileUserData}
              />
            )
          )}
        </Box>
      </VStack>
      <Footer page={page} setpage={setpage} />
      <AddUserModal isOpen={isOpenAddUser} onClose={onCloseAddUser} />
    </VStack>
  );
}
