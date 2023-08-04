import React from 'react';
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
import { ChevronDownIcon } from '@chakra-ui/icons';
export default function EditorMenu({
  selectedValue,
  onOpenRecharge,
}: {
  selectedValue: string;
  onOpenRecharge: () => void;
}) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        bg={'yellowBg'}
        color={'black'}
        size={{ base: 'sm', lg: 'md' }}
      >
        {selectedValue}
      </MenuButton>
      <MenuList color={'black'}>
        <MenuItem
          _hover={{ bg: 'cardBg', color: 'white' }}
          borderRadius={'10px'}
        >
          Redeem
        </MenuItem>
        <MenuItem
          _hover={{ bg: 'cardBg', color: 'white' }}
          borderRadius={'10px'}
        >
          Reset Password
        </MenuItem>
        <MenuItem
          _hover={{ bg: 'cardBg', color: 'white' }}
          borderRadius={'10px'}
        >
          Update Info
        </MenuItem>
        <MenuItem
          _hover={{ bg: 'cardBg', color: 'white' }}
          borderRadius={'10px'}
          onClick={onOpenRecharge}
        >
          Recharge
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
