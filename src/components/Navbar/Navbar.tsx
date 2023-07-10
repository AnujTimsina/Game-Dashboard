import React, { ReactNode } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import {
  FavouritesIcon,
  FilesIcon,
  Settings,
  ProfileLogo,
  ConsoleIcon,
  ProfitReport,
  UserIcon,
  SearchIcon,
  FilterIcon,
  DollarIcon,
  ResetIcon,
  LogoutIcon,
  MoveIcon,
} from 'src/assets/images';
import { NavLink } from 'react-router-dom';

interface LinkItemProps {
  name: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'CONSOLE', icon: FilesIcon },
  { name: 'PROFIT REPORT', icon: FilesIcon },
  { name: 'GAME USER', icon: FilesIcon },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={'primary'} w={'100%'}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
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
      w={{ base: 'full', md: '9.438rem' }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex alignItems="center" justifyContent="center" w={'100%'} pt={'25px'}>
        <ProfileLogo />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <VStack
        mt={'45px'}
        bg={'grayGrad'}
        boxShadow="0px 2px 0px 0px rgba(0, 0, 0, 0.15)"
        py={'0.75rem '}
        px={'1.688rem'}
        gap={0}
      >
        <Text
          fontWeight={'700'}
          fontSize={'0.875rem'}
          flexWrap="wrap"
          justifyContent={'center'}
          align="center"
        >
          Management System
        </Text>
        {/* <Text fontWeight={'700'} fontSize={'0.875rem'}>
          System
        </Text> */}
      </VStack>
      <VStack mt={'35px'} gap={'45px'}>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        ))}
      </VStack>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}
const NavItem = ({ children, ...rest }: NavItemProps) => {
  return (
    <Link
      as={NavLink}
      href="#"
      style={{ textDecoration: 'none' }}
      color={'textMain'}
      fontWeight={'600'}
      fontSize={'0.875rem'}
      cursor="pointer"
      _active={{ bg: 'red', fontWeight: '600', fontSize: '19px' }}
      _focus={{ boxShadow: 'none' }}
      to={'/'}
    >
      {/* <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      > */}
      {children}

      {/* </Flex> */}
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      w={'100%'}
      ml={{ base: 'full', md: '9.438rem' }}
      // ml={{ base: 0, md: 60 }}
      p={{ base: 4, md: '25px 0px 0px 24px' }}
      height="20"
      alignItems="center"
      // bg={'red'}
      // borderBottomWidth="1px"
      // borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={'space-between'}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <HStack
          bg={'cardBg'}
          p={'10px 40px'}
          borderRadius={'10px'}
          boxShadow={'0px 2px 2px 0px rgba(0, 0, 0, 0.25)'}
          gap={'45px'}
        >
          <Box bg={'miniCard'} p={'10px'} borderRadius={'10px'}>
            <ConsoleIcon />
          </Box>
          <Box
            bg={'miniCard'}
            p={'10px'}
            borderRadius={'10px'}
            _selected={{ bg: 'red' }}
          >
            <ProfitReport />
          </Box>
          <Box bg={'miniCard'} p={'10px'} borderRadius={'10px'}>
            <UserIcon />
          </Box>
        </HStack>
        <InputGroup bg={'searchBg'} borderRadius={'10px'}>
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
            p={'10px 15px'}
          >
            <DollarIcon />
            <Text>450.00</Text>
          </HStack>
          <Box
            borderTopRightRadius={'10px'}
            borderBottomRightRadius={'10px'}
            p={'10px 15px'}
            bg={'btn'}
          >
            <Text>Balance</Text>
          </Box>
        </HStack>
        <HStack
          bg={'secondary'}
          p={'10px'}
          borderRadius={'10px'}
          cursor={'pointer'}
          maxW={'124px'}
        >
          <ResetIcon />
          <Text>Reset</Text>
        </HStack>
        <Box bg={'yellowBg'} borderRadius={'10px'} p={'10px'}>
          <LogoutIcon />
        </Box>
        <MoveIcon width={'34px'} height={'34px'} />
        {/* <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex> */}
      </HStack>
    </Flex>
  );
};
