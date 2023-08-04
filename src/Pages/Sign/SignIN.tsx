import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { OAuthButtonGroup } from './OAuthButtonGroup';
import { PasswordField } from './PasswordField';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from 'src/utils/api';
import { usePost } from 'src/utils/reactQuery';
import { useAuth } from 'src/components/AuthProvider/AuthProvider';
import { BACKEND_URL } from 'src/config/config';
import { apiRoutes, pageRoutes } from 'src/routes/pageRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'src/store/user/slices/userSlice';
import { RootState } from 'src/store';
import { IUser } from 'src/interfaces/user';

const SignIN = () => {
  // const { login } = useUtils();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setToken } = useAuth();

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const loginMutation = usePost<
    { userName: string; password: string; logonAddress: string },
    any
  >(`${BACKEND_URL}${apiRoutes.login}`);

  const handleLogin = async () => {
    // const data = {
    //   userName: 'hero',
    //   password: 'password1',
    //   logonAddress: '192.168.1.2',
    // };

    const data = {
      userName: username,
      password: password,
      logonAddress: '192.168.1.67',
    };
    const result = await loginMutation.mutateAsync(data);

    dispatch(updateUser(result.data.user as IUser));
    setToken(result.data.tokens.access.token as string);

    navigate('/', { replace: true });
  };

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) setusername(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) setpassword(e.target.value);
  };

  return (
    <VStack
      w={'100%'}
      px={{ base: '0', sm: '8' }}
      color={'white'}
      bg={'cardBg'}
      p={'1rem'}
      h={'100vh'}
      justify={'center'}
    >
      {/* <VStack > */}

      <Stack
        borderRadius={'10px'}
        spacing="8"
        boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
        p={'1rem'}
      >
        <Stack spacing="6">
          {/* <Logo /> */}
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm' }}>
              Log in to your account
            </Heading>
            <Text color="fg.muted">
              Don't have an account? <Link href="#">Sign up</Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg.surface' }}
          // boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Username</FormLabel>
                <Input id="email" type="email" onChange={handleUsername} />
              </FormControl>
              <PasswordField onChange={handlePassword} />
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="text" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button
                w={'100%'}
                // maxWidth="180px"
                color="#FFF"
                borderRadius="33px"
                border="1px solid #C11506, #FE3A3A"
                background=" radial-gradient(122.87% 59.62% at 50.00% 50.00%, #BF4922 0%, #9D1F14 100%),radial-gradient(155.82% 49.86% at 50.14% 50.88%, rgba(193, 21, 6, 0.15) 19.79%, rgba(254, 58, 58, 0.15) 100%)            "
                // backdropilter: blur(22.5px);
                onClick={handleLogin}
                isLoading={loginMutation.isLoading}
              >
                Sign In
              </Button>
              <HStack>
                <Divider />
                <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>
              <OAuthButtonGroup />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </VStack>
  );
};

export default SignIN;
