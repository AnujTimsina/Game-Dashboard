import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  BoxProps,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  FlexProps,
  Hide,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Show,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  DollarIcon,
  DrawerIcon,
  DropdownIcon,
  FilterIcon,
  LogoutIcon,
  MoveIcon,
  ProfileIcon,
  ProfileLogo,
  ResetIcon,
  SearchIcon,
} from 'src/assets/images';
import ChangePasswordModal from 'src/Pages/GameUser/EditorMenu/Modal/ResetPasswordModal/ChangePasswordModal';
import { pageRoutes } from 'src/routes/pageRoutes';
import { RootState } from 'src/store';
import { resetUser } from 'src/store/user/slices/userSlice';
import { useAuth } from '../AuthProvider/AuthProvider';

interface LinkItemProps {
  name: string;
  route: string;
  subMenu?: {
    name: string;
    route: string;
  }[];
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'CONSOLE', route: pageRoutes.dashboard },
  { name: 'PROFIT REPORT', route: pageRoutes.profitReport },
  {
    name: 'GAME USER',
    route: pageRoutes.userProfile,
    subMenu: [
      {
        name: 'User Management',
        route: pageRoutes.userProfile,
      },
      {
        name: 'Redeem Record',
        route: pageRoutes.redeemRecord,
      },
      {
        name: 'Recharge Record',
        route: pageRoutes.rechargeRecord,
      },
      {
        name: 'Game Records',
        route: pageRoutes.gameRecord,
      },
    ],
  },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={'primary'}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', lg: 'block' }}
      />
      <Show below="lg">
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}

          // size="sm"
        >
          <DrawerOverlay />
          <DrawerContent w={{ base: '16.25rem' }}>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
      </Show>
      {/* Header */}
      <Header onOpen={onOpen} />
      <Box
        ml={{ base: '0', lg: '9.438rem' }}
        p={{ base: '0px 0px', lg: '0px 24px 40px 24px' }}
      >
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="2s ease"
      bg={'secondary'}
      w={{ base: '100%', lg: '9.438rem' }}
      pos="fixed"
      h="full"
      // w={'100%'}
      {...rest}
    >
      <Flex alignItems="center" justifyContent="center" w={'100%'} pt={'25px'}>
        <Image src={ProfileLogo} display={{ base: 'none', lg: 'block' }} />
        {/* <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} /> */}
      </Flex>
      <Box
        mt={'45px'}
        bg={'grayGrad'}
        boxShadow="0px 2px 0px 0px rgba(0, 0, 0, 0.15)"
        py={'0.75rem '}
        px={'1.688rem'}
        gap={0}
        position={'relative'}
      >
        <Show below="lg">
          <Box
            right={'0'}
            top={'-25%'}
            position={'absolute'}
            borderRadius="35px"
            bg="btn"
            w={'36px'}
            h={'36px'}
            display={'flex'} // add this line
            alignItems={'center'} // and this line
            justifyContent={'center'} // and this line
            onClick={onClose}
          >
            <CloseIcon color={'crossIcon'} />
            {/* <DrawerCloseIcon width={'12px'} height={'12px'} /> */}
            {/* <Text>Icon</Text> */}
          </Box>
        </Show>
        <Text
          fontWeight={'700'}
          fontSize={'0.875rem'}
          flexWrap="wrap"
          justifyContent={'center'}
          align="center"
        >
          Management System
        </Text>
      </Box>
      <VStack mt={'35px'} gap={'16px'}>
        {LinkItems.map((link, id) => (
          <NavItem key={id} route={link.route} subMenu={link.subMenu}>
            {link.name}
          </NavItem>
        ))}
      </VStack>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  route: string;
  subMenu?: {
    name: string;
    route: string;
  }[];
}
const NavItem = ({ route, children, subMenu }: NavItemProps) => {
  const [openSubMenu, setopenSubMenu] = React.useState(false);
  return (
    <>
      <Flex
        as={NavLink}
        // href={route}
        style={{ textDecoration: 'none' }}
        color={'textMain'}
        fontWeight={'600'}
        fontSize={'0.875rem'}
        cursor="pointer"
        gap={'1rem'}
        align={'center'}
        _activeLink={{
          bg: 'btn',
          borderRadius: '10px',
          p: '12px',
          color: 'white',
        }}
        _focus={{ boxShadow: 'none' }}
        to={route}
        onClick={() => setopenSubMenu((prev) => !prev)}
      >
        {children}
        {subMenu && <DropdownIcon />}
      </Flex>
      <VStack
        gap={'1rem'}
        // justify={'flex-start'}
        w={'100%'}
        // align={'flex-start'}
      >
        {subMenu &&
          openSubMenu &&
          subMenu.map((item, id) => (
            <Link
              key={id}
              ml={'30px '}
              as={NavLink}
              // href={route}
              style={{ textDecoration: 'none' }}
              color={'textMain'}
              fontWeight={'600'}
              fontSize={'0.75rem'}
              cursor="pointer"
              _activeLink={{ color: 'activeSubMenu' }}
              _selected={{ bg: 'green' }}
              _focus={{ boxShadow: 'none' }}
              to={item.route}
            >
              {item.name}
            </Link>
          ))}
      </VStack>
    </>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const Header = ({ onOpen, ...rest }: MobileProps) => {
  const { setToken, setRefreshToken } = useAuth();
  const dispatch = useDispatch();
  const gameUser = useSelector((state: RootState) => state.gameUser);

  const {
    isOpen: isOpenResetPassword,
    onClose: onCloseResetPassword,
    onOpen: onOpenResetPassword,
  } = useDisclosure();

  const handleLogout = async () => {
    setToken(null);
    setRefreshToken(null);
    dispatch(resetUser());
  };

  return (
    <Flex>
      <VStack
        spacing={{ base: '2', lg: '6' }}
        w={'100%'}
        justify={'space-between'}
        ml={{ base: '0', lg: '9.438rem' }}
        alignItems="center"
        justifyContent={'center'}
      >
        <HStack
          spacing={{ base: '2', lg: '6' }}
          p={{ base: '15px 10px', lg: '30px 20px' }}
          w={'100%'}
          bg={{ base: 'searchBg', lg: 'none' }}
          justify={'space-between'}
        >
          <Show below="lg">
            <HStack gap={'15px'}>
              <Box onClick={onOpen}>
                <DrawerIcon />
              </Box>
              <Box>
                <Image src={ProfileLogo} w={'36px'} h={'36px'} />
              </Box>
            </HStack>
          </Show>

          <Hide below="lg">
            <HStack w={'100%'} gap={'2rem'}>
              <InputGroup bg={'searchBg'} borderRadius={'10px'} maxW={'300px'}>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon />
                </InputLeftElement>
                <Input type="text" placeholder="Search Here" border={'none'} />
              </InputGroup>
              <Box
                bg={'miniCard'}
                p={'10px'}
                borderRadius={'10px'}
                cursor={'pointer'}
              >
                <FilterIcon />
              </Box>
              <HStack gap={'0'}>
                <HStack
                  bg={'secondary'}
                  borderTopLeftRadius={'10px'}
                  borderBottomLeftRadius={'10px'}
                  p={{ base: '8px 8px', lg: '10px 15px' }}
                >
                  <DollarIcon />
                  <Text>{gameUser.balance}</Text>
                </HStack>
                <Box
                  borderTopRightRadius={'10px'}
                  borderBottomRightRadius={'10px'}
                  p={{ base: '8px', lg: '10px 15px' }}
                  bg={'btn'}
                >
                  <Text>Balance</Text>
                </Box>
              </HStack>
              <HStack
                bg={'secondary'}
                p={{ base: '8px', lg: '10px' }}
                borderRadius={'10px'}
                cursor={'pointer'}
                maxW={'124px'}
                onClick={onOpenResetPassword}
              >
                <ResetIcon />
                <Text>Reset</Text>
              </HStack>
            </HStack>
          </Hide>

          <HStack justify={'flex-end'} gap={'1rem'}>
            <HStack gap={'0'} position={'relative'}>
              <Image
                src={ProfileIcon}
                border={'2px solid white'}
                borderRadius={'full'}
                position={'absolute'}
                left={'-25px'}
              />
              <Box
                minW={'150px'}
                bg={'secondary'}
                p={{ base: '8px', lg: '10px 10px 10px 30px' }}
                borderLeftRadius={'10px'}
                cursor={'pointer'}
                maxW={'124px'}
              >
                <Text align={'center'}>{gameUser.userName}</Text>
              </Box>
              <Box
                bg={'yellowBg'}
                borderRightRadius={'10px'}
                p={{ base: '8px', lg: '12px' }}
                onClick={handleLogout}
                cursor={'pointer'}
              >
                <LogoutIcon />
              </Box>
            </HStack>
            <Hide below="lg">
              <Box>
                <MoveIcon />
              </Box>
            </Hide>
          </HStack>
        </HStack>
        <Show below="lg">
          <HStack
            w={'100%'}
            justify={'space-between'}
            gap={'1rem'}
            p={'15px 10px'}
          >
            <InputGroup bg={'white'} borderRadius={'10px'}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon fill="black" stroke="black" />
              </InputLeftElement>
              <Input type="text" placeholder="Search Here" border={'none'} />
            </InputGroup>
            <Box
              bg={'white'}
              p={'10px'}
              borderRadius={'10px'}
              cursor={'pointer'}
            >
              <FilterIcon fill="black" stroke="black" />
            </Box>
          </HStack>
        </Show>
      </VStack>
      <ChangePasswordModal
        isOpen={isOpenResetPassword}
        onClose={onCloseResetPassword}
      />
    </Flex>
  );
};
