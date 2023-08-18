import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import TransactionModal from 'src/Pages/GameUser/EditorMenu/Modal/TransactionModal/TransactionModal';
import { TRANSACTION_TYPES } from 'src/config/constants';
import { IUserFormatted } from 'src/interfaces/user';
import ResetPasswordModal from './Modal/ResetPasswordModal/ResetPasswordModal';
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
  const {
    isOpen: isOpenResetPassword,
    onClose: onCloseResetPassword,
    onOpen: onOpenResetPassword,
  } = useDisclosure();

  const [selectedUser, setSelectedUser] = useState<IUserFormatted | null>(null);
  const [transactionType, settransactionType] =
    useState<TRANSACTION_TYPES | null>(null);

  const modalHandler = () => {
    setSelectedUser(user);
    onOpenRecharge();
  };

  const rechargeHandler = () => {
    settransactionType(TRANSACTION_TYPES.RECHARGE);
    modalHandler();
  };

  const redeemHandler = () => {
    settransactionType(TRANSACTION_TYPES.REDEEM);
    modalHandler();
  };

  const passwordHandler = async () => {
    setSelectedUser(user);
    onOpenResetPassword();
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
            onClick={redeemHandler}
          >
            Redeem
          </MenuItem>
          <MenuItem
            _hover={{ bg: 'cardBg', color: 'white' }}
            borderRadius={'10px'}
            onClick={passwordHandler}
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
      {selectedUser && transactionType && (
        <TransactionModal
          isOpen={isOpenRecharge}
          onClose={onCloseRecharge}
          user={selectedUser}
          transactionType={transactionType}
        />
      )}
      {selectedUser && (
        <ResetPasswordModal
          isOpen={isOpenResetPassword}
          onClose={onCloseResetPassword}
          user={selectedUser}
          // transactionType={transactionType}
        />
      )}
    </>
  );
}
