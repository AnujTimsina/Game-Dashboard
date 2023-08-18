import {
  Box,
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { usePostLoginUser } from 'src/api/auth';
import { LoginBg, MainLogo, UsernameIcon } from 'src/assets/images';
import { useAuth } from 'src/components/AuthProvider/AuthProvider';
import { PasswordField } from './PasswordField';

const SignIN = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setToken, setRefreshToken } = useAuth();
  const toast = useToast();

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const {
    mutateAsync: loginMutation,
    isLoading,
    isError,
    error,
  } = usePostLoginUser();

  const handleLogin = async () => {
    const data = {
      userName: username,
      password: password,
      logonAddress: '192.168.1.67',
    };
    const result = await loginMutation(data);

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

  useEffect(() => {
    if (isError)
      toast({
        title: <Text color={'white'}>Error.</Text>,
        description: <Text color={'white'}>{error.message}</Text>,
        status: 'error',
        duration: 6000,
        isClosable: true,
        position: 'top',
      });
  }, [isError]);

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
                isLoading={isLoading}
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
