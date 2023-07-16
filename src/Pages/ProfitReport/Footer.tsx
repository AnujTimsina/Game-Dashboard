import { ArrowDownIcon } from '@chakra-ui/icons';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  DropdownBlackIcon,
  DropdownIcon,
  PageDown,
  PageUp,
} from 'src/assets/images';

export default function Footer() {
  return (
    <HStack
      w={'100%'}
      justify={'space-between'}
      bg={'whiteCard'}
      p={{ base: '14px 20px' }}
      boxShadow="0px 4px 2px 0px rgba(0, 0, 0, 0.25), 0px 2px 2px 0px rgba(0, 0, 0, 0.25) inset"
    >
      <Text color={'grayText'} fontWeight={'600'}>
        Total: 1
      </Text>
      <HStack bg={'cardBg2'} p={{ base: '7px 10px' }} borderRadius={'5px'}>
        <Text>20 num/page</Text>
        <VStack gap={'8px'}>
          <PageUp />
          <PageDown />
        </VStack>
      </HStack>
      <HStack>
        <DropdownBlackIcon style={{ transform: 'rotate(90deg)' }} />
        <Box bg={'cardBg2'} p={{ base: '7px 10px' }} borderRadius={'5px'}>
          <Text color={'white'} fontWeight={'600'}>
            1
          </Text>
        </Box>

        <DropdownBlackIcon style={{ transform: 'rotate(-90deg)' }} />
      </HStack>
    </HStack>
  );
}
