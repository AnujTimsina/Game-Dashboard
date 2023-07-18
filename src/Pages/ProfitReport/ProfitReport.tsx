import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import {
  DropdownIcon,
  ResetIcon,
  SearchIcon,
  SearchIcon2,
} from 'src/assets/images';
import FilteredReport from './FilteredReport';
import Footer from './Footer';

export default function ProfitReport() {
  return (
    <VStack
      gap={0}
      w={'100%'}
      h={'100vh'}
      // bg={'transparent'}
      justify={'space-between'}
    >
      <VStack
        w={'100%'}
        h={'100vh'}
        bg={'cardBg'}
        p={{ base: '15px 20px ' }}
        borderRadius={'10px'}
      >
        <HStack
          w={'100%'}
          borderRadius={'10px'}
          p={{ base: '1rem 0.5rem', lg: '1rem 1.5rem' }}
          background="#1D2331"
          boxShadow={
            '0px 4px 4px 0px rgba(0, 0, 0, 0.35), 0px 4px 4px 0px rgba(255, 255, 255, 0.25) inset, 0px 4px 0px 0px rgba(0, 0, 0, 0.35)'
          }
          justify={'space-between'}
        >
          <HStack gap={{ base: '0.4rem', lg: '1rem' }} w={'100%'}>
            <Input
              type="date"
              color={'white'}
              placeholder="Auto Date range"
              _placeholder={{ color: 'white' }}
              border={'none'}
              boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25), 0px 2px 2px 0px rgba(0, 0, 0, 0.25) inset"
              p={'10px'}
              w={{ lg: '240px' }}
            />
            <Box
              bg={'searchBg'}
              boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25), 0px 2px 2px 0px rgba(0, 0, 0, 0.25) inset"
              p={{ base: '0.25rem', md: '10px', lg: '10px' }}
              borderRadius={'10px'}
              cursor={'pointer'}
            >
              <SearchIcon2 />
            </Box>
            <Box
              bg={'searchBg'}
              boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25), 0px 2px 2px 0px rgba(0, 0, 0, 0.25) inset"
              p={{ base: '0.25rem', md: '10px', lg: '10px' }}
              borderRadius={'10px'}
              cursor={'pointer'}
            >
              <ResetIcon />
            </Box>
          </HStack>
          <Menu>
            <MenuButton
              px={4}
              py={2}
              transition="2s ease-in"
              borderRadius="md"
              //   borderWidth="1px"
              _hover={{ bg: 'gray.400' }}
              _expanded={{ bg: 'gray.400' }}
              _focus={{ boxShadow: 'outline' }}
              boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.25), 0px 2px 2px 0px rgba(0, 0, 0, 0.25) inset"
              w={'240px'}
            >
              <HStack w={'100%'} justify={'space-between'}>
                <Text> Today</Text>
                <DropdownIcon />
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem>New File</MenuItem>
              <MenuItem>New Window</MenuItem>
              <MenuDivider />
              <MenuItem>Open...</MenuItem>
              <MenuItem>Save File</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <FilteredReport />
      </VStack>
      <Footer />
    </VStack>
  );
}
