import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  VStack,
  useBreakpoint,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import {
  AddUser,
  DropdownIcon,
  ResetIcon,
  SearchIcon,
  SearchIcon2,
} from 'src/assets/images';
import FilteredReport from '../ProfitReport/FilteredReport';
import Footer from '../ProfitReport/Footer';

export default function GameUser() {
  const addUservalue = useBreakpointValue(
    {
      base: <AddUser />,
      lg: 'Add User',
    },
    {
      // Breakpoint to use when mediaqueries cannot be used, such as in server-side rendering
      // (Defaults to 'base')
      fallback: 'base',
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
            >
              {addUservalue}
            </Button>
          </Stack>
        </HStack>

        {/* <FilteredReport /> */}
      </VStack>
      <Footer />
    </VStack>
  );
}
