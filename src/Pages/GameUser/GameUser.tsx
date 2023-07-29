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
  useDisclosure,
} from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { AddUser, ResetIcon, SearchIcon2 } from 'src/assets/images';
import Footer from '../ProfitReport/Footer';
import { DataTable } from './DataTable';
import { ChevronDownIcon } from '@chakra-ui/icons';
import VerticalTable from './MobileDataTable';
import AddUserModal from './AddUserModal/AddUserModal';

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
  const { isOpen, onClose, onOpen } = useDisclosure();
  const data: GameData[] = [
    {
      id: <Text color={'yellowBg'}> 200</Text>,
      status: <Switch size={{ base: 'sm', lg: 'lg' }} variant={'boxy'} />,
      username: 'john',
      nickname: 'john nick',
      balance: 300,
      create_time: '29-20-2023',
      login_times: 5,
      last_login_times: '29-20-2023',
      last_login_ip: '69.136.237.40',
      operation: (
        <Menu size={{ base: 'sm', lg: 'lg' }}>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bg={'yellowBg'}
            color={'black'}
          >
            Editor
          </MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
          </MenuList>
        </Menu>
      ),
    },
    {
      id: <Text color={'yellowBg'}> 200</Text>,
      status: <Switch size={{ base: 'sm', lg: 'lg' }} variant={'boxy'} />,
      username: 'john',
      nickname: 'john nick',
      balance: 300,
      create_time: '29-20-2023',
      login_times: 5,
      last_login_times: '29-20-2023',
      last_login_ip: '69.136.237.40',
      operation: (
        <Menu size={{ base: 'sm', lg: 'lg' }}>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bg={'yellowBg'}
            color={'black'}
          >
            Editor
          </MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
          </MenuList>
        </Menu>
      ),
    },
  ];

  const columnHelper = createColumnHelper<GameData>();

  const columns = [
    columnHelper.accessor('id', {
      cell: (info) => info.getValue(),
      header: 'ID',
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor('status', {
      cell: (info) => info.getValue(),
      header: 'Status',
    }),
    columnHelper.accessor('username', {
      cell: (info) => info.getValue(),
      header: 'Username',
    }),
    columnHelper.accessor('nickname', {
      cell: (info) => info.getValue(),
      header: 'Nickname',
    }),
    columnHelper.accessor('balance', {
      cell: (info) => info.getValue(),
      header: 'Balance',
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor('create_time', {
      cell: (info) => info.getValue(),
      header: 'Create Time',
    }),
    columnHelper.accessor('login_times', {
      cell: (info) => info.getValue(),
      header: 'Login Times',
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor('last_login_times', {
      cell: (info) => info.getValue(),
      header: 'Last Login Times',
    }),
    columnHelper.accessor('last_login_ip', {
      cell: (info) => info.getValue(),
      header: 'Last Login IP',
    }),
    columnHelper.accessor('operation', {
      cell: (info) => info.getValue(),
      header: 'Operation',
    }),
  ];

  const addUservalue = useBreakpointValue({
    base: <AddUser />,
    lg: 'Add User',
  });

  const handleAddUser = () => {
    onOpen();
  };
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
          <DataTable columns={columns} data={data} />
        </Box>
      </VStack>
      <Footer />
      <AddUserModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
}
