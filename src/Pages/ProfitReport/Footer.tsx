import { ArrowDownIcon } from '@chakra-ui/icons';
import { Box, HStack, Hide, Input, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  DropdownBlackIcon,
  DropdownIcon,
  PageDown,
  PageUp,
} from 'src/assets/images';

export default function Footer({
  setpage,
  page,
}: {
  page: number;
  setpage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <HStack
      w={'100%'}
      justify={{ base: 'space-between', lg: 'flex-start' }}
      bg={'whiteCard'}
      p={{ base: '14px 20px' }}
      boxShadow="0px 4px 2px 0px rgba(0, 0, 0, 0.25), 0px 2px 2px 0px rgba(0, 0, 0, 0.25) inset"
      borderBottomRadius={'10px'}
      gap={'1rem'}
    >
      <Text
        color={'grayText'}
        fontWeight={'600'}
        order={{ base: '1', lg: '4' }}
      >
        Total: 1
      </Text>
      <Hide below="lg">
        <HStack order={2}>
          <Text color={'grayText'} fontWeight={'600'}>
            To
          </Text>
          <Input
            type="number"
            borderRadius=" 5px"
            border="1px solid rgba(34, 37, 54, 0.35)"
            maxW={'60px'}
            p={'1rem'}
            color={'black'}
            _focus={{ outline: 'none' }}
            _hover={{ outline: 'none' }}
          />
          <Text color={'grayText'} fontWeight={'600'}>
            Page
          </Text>
        </HStack>
      </Hide>
      <HStack
        bg={'cardBg2'}
        p={{ base: '7px 10px' }}
        borderRadius={'5px'}
        order={{ base: '2', lg: '5' }}
      >
        <Text>20 num/page</Text>
        <VStack gap={'8px'}>
          <PageUp />
          <PageDown />
        </VStack>
      </HStack>
      <HStack order={{ base: '3', lg: '1' }}>
        <Box onClick={() => setpage((prev) => prev - 1)}>
          <DropdownBlackIcon style={{ transform: 'rotate(90deg)' }} />
        </Box>
        <Box bg={'cardBg2'} p={{ base: '7px 10px' }} borderRadius={'5px'}>
          <Text color={'white'} fontWeight={'600'}>
            {page}
          </Text>
        </Box>
        <Box onClick={() => setpage((prev) => prev + 1)}>
          <DropdownBlackIcon style={{ transform: 'rotate(-90deg)' }} />
        </Box>
      </HStack>
    </HStack>
  );
}
