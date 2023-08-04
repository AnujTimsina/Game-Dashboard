import { useState } from 'react';
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
import { IUserFormatted } from 'src/interfaces/user';
import RechargeModal from '../RechargeModal/RechargeModal';
export default function EditorMenu({
  selectedValue,
  user,
}: {
  selectedValue: string;
  user: IUserFormatted;
}) {
  const {
    isOpen: isOpenRecharge,
    onClose: onCloseRecharge,
    onOpen: onOpenRecharge,
  } = useDisclosure();

  const [selectedUser, setSelectedUser] = useState<IUserFormatted | null>(null);

  const rechargeHandler = () => {
    setSelectedUser(user);
    onOpenRecharge();
  };
  return (
    <>
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
            onClick={rechargeHandler}
          >
            Recharge
          </MenuItem>
        </MenuList>
      </Menu>
      {selectedUser && (
        <RechargeModal
          isOpen={isOpenRecharge}
          onClose={onCloseRecharge}
          user={selectedUser}
        />
      )}
    </>
  );
}
