import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  DropdownBlackIcon,
  DropdownCloseIcon,
  DropdownIcon,
} from 'src/assets/images';

export default function FilteredReport() {
  const [showDetails, setshowDetails] = useState(false);
  const reportDetails = [
    { title: 'Total Recharge', value: '0.0' },
    { title: 'Total Withdrawal', value: '0.0' },
    { title: 'Income', value: '0.0' },
    { title: 'Profit Percentage', value: '0.0' },
  ];

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      gap={4}
      w={'100%'}
      borderRadius="10px"
      background="searchBg"
      p={{ base: '1rem 0.5rem', lg: '1rem 1.5rem' }}
      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.35), 0px 4px 4px 0px rgba(255, 255, 255, 0.25) inset, 0px 4px 0px 0px rgba(0, 0, 0, 0.35)"
    >
      <GridItem colSpan={2} display="flex" justifyContent={'space-between'}>
        <Text variant={'dateContent'}>Date</Text>
        <Text variant={'dateContentValue'} textAlign="center">
          2023-07-03
        </Text>
      </GridItem>
      <GridItem colSpan={1} justifyContent={'flex-end'} display="flex">
        <Flex
          bg={'yellowBg'}
          borderRadius={'full'}
          w={'21px'}
          h={'21px'}
          alignItems={'center'}
          justifyContent={'center'}
          transition={'opacity 0.5s ease-in-out'} // Add transition property
          onClick={() => setshowDetails((prev) => !prev)}
        >
          {showDetails ? <DropdownCloseIcon /> : <DropdownBlackIcon />}
        </Flex>
      </GridItem>
      <GridItem
        colSpan={2}
        style={{
          transition: 'opacity 1s ease-in', // Add transition property
          opacity: showDetails ? 1 : 0, // Set initial opacity
        }}
      >
        {showDetails &&
          reportDetails.map((item, id) => (
            <HStack w={'100%'} justify={'space-between'}>
              <Text variant={'dateContent'}>{item.title}</Text>
              <Text variant={'dateContentValue'}>{item.value}</Text>
            </HStack>
          ))}
      </GridItem>
    </Grid>
  );
}
