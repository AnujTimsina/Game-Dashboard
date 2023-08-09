import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
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
import { LoginBg, MainLogo, UsernameIcon } from 'src/assets/images';

const SignIN = () => {
  // const { login } = useUtils();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setToken, setRefreshToken } = useAuth();

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const loginMutation = usePost<
    { userName: string; password: string; logonAddress: string },
    any
  >(`${BACKEND_URL}${apiRoutes.login}`);

  const handleLogin = async () => {
    const data = {
      userName: username,
      password: password,
      logonAddress: '192.168.1.67',
    };
    const result = await loginMutation.mutateAsync(data);

    setRefreshToken(result.data.tokens.refresh.token as string);
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
      p={'1rem'}
      h={'100vh'}
      justify={'center'}
      bg={`url(${LoginBg})`}
      bgSize="cover"
      bgRepeat="repeat"
      backgroundPosition={'center'}
    >
      <Stack
        borderRadius={'30px'}
        spacing="3"
        boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
        px={'1rem'}
        py={'4rem'}
        background="signinBg"
        backdropFilter="blur(12px)"
      >
        <Flex w={'400px'} align={'center'} justify={'center'}>
          <Image src={MainLogo} w={'300px'} />
        </Flex>
        <Box
          px={{ base: '4', sm: '10' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="2 " color={'black'}>
              <FormControl>
                <InputGroup alignContent={'center'} height={'55px'}>
                  <InputLeftElement pointerEvents="none">
                    <UsernameIcon width={'28px'} height={'28px'} />
                  </InputLeftElement>
                  <Input
                    id="email"
                    type="text"
                    onChange={handleUsername}
                    border-radius="10px"
                    background="inputGlassBg"
                    box-shadow="0px 3px 10px 0px rgba(0, 0, 0, 0.35)"
                    placeholder={'Username'}
                    color={'placeholder'}
                    fontWeight={'600'}
                    fontSize={'1rem'}
                    _placeholder={{
                      color: 'placeholder',
                      fontWeight: '600',
                      fontSize: '1rem',
                    }}
                  />
                </InputGroup>
              </FormControl>
              <PasswordField onChange={handlePassword} />
            </Stack>

            <Stack align={'center'} pt={'2rem'}>
              <Button
                w={'100%'}
                maxW={'200px'}
                color="#FFF"
                borderRadius="10px"
                onClick={handleLogin}
                isLoading={loginMutation.isLoading}
                background={'btn'}
                box-shadow="0px 3px 10px 0px rgba(0, 0, 0, 0.35)"
              >
                Sign In
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </VStack>
  );
};

export default SignIN;
