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

const SignIN = () => {
  // const { login } = useUtils();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const payload = {
      username: username,
      password: password,
      // username: 'kshitij@chand.network',
      // password: 'TheRocket@124',
    };

    // const token = await login(payload.username, payload.password);

    // setToken(token);
    navigate('/', { replace: true });
  };

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) setusername(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) setpassword(e.target.value);
  };

  return (
    <VStack
      w={'100%'}
      // maxW="lg"
      px={{ base: '0', sm: '8' }}
      color={'white'}
      bg={'grayBg'}
      borderRadius={'10px'}
      p={'1rem'}
    >
      {/* <VStack > */}

      <Stack spacing="8">
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
          boxShadow={{ base: 'none', sm: 'md' }}
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
                onClick={handleSignIn}
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
