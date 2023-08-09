import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from '@chakra-ui/react';
import { forwardRef, useRef } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { PasswordIcon } from 'src/assets/images';

export const PasswordField = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { isOpen, onToggle } = useDisclosure();
    const inputRef = useRef<HTMLInputElement>(null);

    const mergeRef = useMergeRefs(inputRef, ref);
    const onClickReveal = () => {
      onToggle();
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    };

    return (
      <FormControl>
        <InputGroup>
          <InputRightElement>
            <IconButton
              color={'white'}
              variant="text"
              aria-label={isOpen ? 'Mask password' : 'Reveal password'}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
          <InputLeftElement pointerEvents="none">
            <PasswordIcon width={'28px'} height={'28px'} />
          </InputLeftElement>
          <Input
            id="password"
            ref={mergeRef}
            name="password"
            type={isOpen ? 'text' : 'password'}
            autoComplete="current-password"
            required
            border-radius="10px"
            background="inputGlassBg"
            box-shadow="0px 3px 10px 0px rgba(0, 0, 0, 0.35)"
            color={'placeholder'}
            fontWeight={'600'}
            fontSize={'1rem'}
            placeholder={'Password'}
            _placeholder={{
              color: 'placeholder',
              fontWeight: '600',
              fontSize: '1rem',
            }}
            {...props}
          />
        </InputGroup>
      </FormControl>
    );
  }
);

PasswordField.displayName = 'PasswordField';
