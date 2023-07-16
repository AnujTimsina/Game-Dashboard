import {
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  HStack,
  Hide,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Show,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { Children, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ConsoleIcon,
  DollarIcon,
  DrawerIcon,
  FilesIcon,
  FilterIcon,
  LogoutIcon,
  MoveIcon,
  ProfileLogo,
  ProfitReport,
  ResetIcon,
  SearchIcon,
  UserIcon,
} from 'src/assets/images';
import { pageRoutes } from 'src/routes/pageRoutes';

interface LinkItemProps {
  name: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  route: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'CONSOLE', icon: FilesIcon, route: pageRoutes.dashboard },
  { name: 'PROFIT REPORT', icon: FilesIcon, route: pageRoutes.profitReport },
  { name: 'GAME USER', icon: FilesIcon, route: pageRoutes.userProfile },
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
      w={{ lg: '9.438rem' }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex alignItems="center" justifyContent="center" w={'100%'} pt={'25px'}>
        <Image src={ProfileLogo} />
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
          <NavItem key={link.name} icon={link.icon} route={link.route}>
            {link.name}
          </NavItem>
        ))}
      </VStack>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  route: string;
}
const NavItem = ({ route, children, ...rest }: NavItemProps) => {
  return (
    <Link
      as={NavLink}
      // href={route}
      style={{ textDecoration: 'none' }}
      color={'textMain'}
      fontWeight={'600'}
      fontSize={'0.875rem'}
      cursor="pointer"
      _active={{ bg: 'red', fontWeight: '600', fontSize: '19px' }}
      _selected={{ bg: 'green' }}
      _focus={{ boxShadow: 'none' }}
      to={route}
    >
      {children}
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex>
      {/* <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      /> */}
      <VStack
        spacing={{ base: '2', lg: '6' }}
        w={'100%'}
        justify={'space-between'}
        // p={{ lg: '0px 24px 0px 24px' }}
        ml={{ base: '0', lg: '9.438rem' }}
        alignItems="center"
        justifyContent={'center'}
      >
        <HStack
          // display={{ base: 'none', lg: 'flex' }}
          spacing={{ base: '2', lg: '6' }}
          p={{ base: '15px 10px', lg: '30px 20px' }}
          w={'100%'}
          bg={{ base: 'searchBg', lg: 'none' }}
          justify={'space-between'}
        >
          <Show below="lg">
            <HStack gap={'15px'}>
              <DrawerIcon />
              <Box>
                <Image src={ProfileLogo} w={'36px'} h={'36px'} />
              </Box>
            </HStack>
          </Show>
          <Hide below="lg">
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
          </Hide>
          <Hide below="lg">
            <HStack w={'100%'} justify={'center'} gap={'1rem'}>
              <InputGroup bg={'searchBg'} borderRadius={'10px'} maxW={'240px'}>
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
            </HStack>
          </Hide>
          <HStack gap={'0'}>
            <HStack
              bg={'secondary'}
              borderTopLeftRadius={'10px'}
              borderBottomLeftRadius={'10px'}
              p={{ base: '8px 8px', lg: '10px 15px' }}
            >
              <DollarIcon />
              <Text>450.00</Text>
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
          <HStack justify={'flex-end'} gap={'1rem'}>
            <HStack
              bg={'secondary'}
              p={{ base: '8px', lg: '10px' }}
              borderRadius={'10px'}
              cursor={'pointer'}
              maxW={'124px'}
            >
              <ResetIcon />
              <Text>Reset</Text>
            </HStack>
            <Box
              bg={'yellowBg'}
              borderRadius={'10px'}
              p={{ base: '8px', lg: '10px' }}
            >
              <LogoutIcon />
            </Box>
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
    </Flex>
  );
};
